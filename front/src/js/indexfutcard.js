import '../stylesheets/main.css';
import '../stylesheets/futcard.css';
import {Chart} from "chart.js/auto";
import 'chartjs-plugin-datalabels';
import "../../node_modules/@fortawesome/fontawesome-free/js/all.js";
import {fetchQuery} from "./model/fetchQuery";

document.addEventListener("DOMContentLoaded", (event) => {
    const params = new URLSearchParams(sessionStorage);
    fetchQuery(`http://localhost:3000/player?${params}`,{
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: sessionStorage
    },
        (data) => {
            console.log(data)
            const player = data[0];
            if(player){
                const pace = parseInt(player["?statVitesse"]);
                const shoot = parseInt(player["?statTir"]);
                const defense = parseInt(player["?statDefense"]);
                const dribble = parseInt(player["?statDribble"]);
                const physical = parseInt(player["?statEndurance"]);
                const pass = parseInt(player["?statPasse"]);
                const general = parseInt(player['?statGeneral']);
                console.log(window.location.origin);
                document.querySelector(".home-body").innerHTML =`
                    <div class="fut-player-card">
                        <div class="player-card-top">
                            <div class="player-master-info">
                                <div class="player-rating">
                                    <span class="rating-stat">${general}</span>
                                </div>
                                <div class="player-position">
                                    <span class="position-data">${player["?initialesPoste"].toUpperCase()}</span>
                                </div>
                                <div class="player-nation">
                                    <img class="nation-logo" src="${player["?logoPays"]}" alt="Pays" draggable="false"/>
                                </div>
                                <div class="player-club">
                                    <img class="club-logo" src="${player["?logoClub"]}" alt="Club" draggable="false"/>
                                </div>
                            </div>
                            <div class="player-picture">
                                <img class="player-logo" src="${player["?logoJoueur"]}" alt="Joueur" draggable="false"/>
                            </div>
                        </div>
                        <div class="player-card-bottom">
                            <div class="player-info">
                                <div class="player-name">
                                    <span class="name-value">${player["?aliasJoueur"].toUpperCase()}</span>
                                </div>
                                <div class="player-features">
                                    <div class="player-features-col">
                                        <div>
                                            <p class="player-feature-value pace-value">${pace}</p>
                                            <p class="player-feature-title">VIT</p>
                                        </div>
                                        <div>
                                            <p class="player-feature-value shoot-value">${shoot}</p>
                                            <p class="player-feature-title">TIR</p>
                                        </div>
                                        <div>
                                            <p class="player-feature-value pass-value">${pass}</p>
                                            <p class="player-feature-title">PAS</p>
                                        </div>
                                    </div>
                                    <div class="player-features-col">
                                        <div>
                                            <p class="player-feature-value dribble-value">${dribble}</p>
                                            <p class="player-feature-title">DRI</p>
                                        </div>
                                        <div>
                                            <p class="player-feature-value defense-value">${defense}</p>
                                            <p class="player-feature-title">DEF</p>
                                        </div>
                                        <div>
                                            <p class="player-feature-value physical-value">${physical}</p>
                                            <p class="player-feature-title">PHY</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- The Modal -->
                    <div id="myModal" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <div class="modal-body">
                                <div class="player-header">
                                    <div class="player-nationality">
                                        <img class="nation-logo" src="${player["?logoPays"]}" alt="Pays" draggable="false" width="120" height="80"/>
                                        <p class="nationality-data">${player["?nomPays"]}</p>
                                    </div>
                                    <div class="player-middle">
                                        <div class="player-presentation">
                                            <div class="player-position-modal">
                                                <p class="position-data">${player["?initialesPoste"].toUpperCase()}</p>
                                            </div>
                                            <div class="player-photo">
                                                <img class="player-logo" src="${player["?logoJoueur"]}" alt="Joueur" draggable="false"/>
                                                <p class="name-value">${player["?aliasJoueur"].toUpperCase()}</p>
                                            </div>
                                            <div class="player-stat">
                                                <p class="rating-stat">${general}</p>
                                            </div>
                                        </div>
                                        <canvas id="statsChart"></canvas>
                                    </div>
                                    <div class="player-club-body">
                                        <img class="club-logo" src="${player["?logoClub"]}" alt="Club" draggable="false"/>
                                        <p class="club-name">${player["?nomClub"]}</p>
                                    </div>
                                </div>
                                <div class="player-body">
                                    <div class="player-title">
                                        <p>Nom</p>
                                        <p>Âge</p>
                                        <p>Club</p>
                                        <p>Position</p>
                                        <p>Nationalité</p>
                                        <p>Pied fort</p>
                                        <p>Mauvais pied</p>
                                        <p>Gestes techniques</p>
                                    </div>
                                    <div class="full-player-info">
                                        <p class="full-name">${player['?nomJoueur']}</p>
                                        <p class="age-data">${player['?age']} ans</p>
                                        <p class="club-name">${player["?nomClub"]}</p>
                                        <p class="full-position-data">${player["?nomPoste"]}</p>
                                        <p class="nationality-data">${player["?nomPays"]}</p>
                                        <p class="strong-foot">${player["?descPiedFort"]}</p>
                                        <p><span class="weak-foot">${player["?mauvaisPied"]}</span> <i class="fa fa-star" style="color: #ede03d;"></i></p>
                                        <p><span class="skills-rate">${player["?gestesTechniques"]}</span> <i class="fa fa-star" style="color: #ede03d;"></i></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                const radarChart = new Chart(document.getElementById("statsChart"), {
                    type: 'radar',
                    data: {
                        labels: ["Vitesse", "Tir", "Passe", "Dribble", "Défense", "Physique"],
                        datasets: [{
                            label: player['?nomJoueur'],
                            backgroundColor: "rgba(210, 210, 210, 0.5)",
                            borderColor: "rgba(210, 210, 210, 1)",
                            data: [pace, shoot, pass, dribble, defense, physical]
                        }]
                    },
                    options: {
                        scales: {
                            r: {
                                angleLines: {
                                    color: "rgba(210, 210, 210, 1)" // Modifier la couleur des lignes de l'hexagone ici
                                },
                                grid: {
                                    color: "rgba(150, 150, 150, 1)" // Modifier la couleur des lignes de la grille ici
                                },
                                pointLabels: {
                                    color: "rgba(210, 210, 210, 1)", // Modifier la couleur des étiquettes ici
                                },
                                ticks: {
                                    color: "rgba(210, 210, 210, 1)",
                                    backdropColor: "#383e41",
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: "rgba(210, 210, 210, 1)" // Modifier la couleur du texte de la légende ici
                                }
                            }
                        },
                    }
                });
                let modal = document.getElementById("myModal");

                let futCard = document.querySelector(".fut-player-card");

                let span = document.getElementsByClassName("close")[0];

                futCard.onclick = () => {
                    modal.style.display = "block";
                }

                span.onclick = () =>  {
                    modal.style.display = "none";
                }

                window.onclick = function(event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                }
            }
            else {
                let div = document.createElement("div");
                let h1 =  document.createElement("h1");
                h1.textContent = "Aucun joueur n'a été trouvé !"
                div.className = "error";
                div.appendChild(h1);
                document.querySelector(".container").prepend(div);
            }
        }
    )
});
document.querySelector(".return-button").addEventListener("click", function() {
    sessionStorage.clear();
    window.location = window.location.origin;
});
