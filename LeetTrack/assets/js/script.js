document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const cardStatsContainer = document.querySelector(".stats-card");

    // Get all the level elements
    const easyLevel = document.getElementById("easy-level");
    const mediumLevel = document.getElementById("medium-level");
    const hardLevel = document.getElementById("hard-level");

    function validateUsername(username) {
      console.log("Validating username:", username);

        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9._-]{3,24}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            
            const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
            
            const response = await fetch(url);
            
            
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            
            const data = await response.json();
            console.log("User data retrieved:", data);

            updateProgressCircles(data);
            updateStatsCard(data);
            
        } catch(error) {
          console.log("Error fetching data:", error);

            statsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgressCircles(data) {
        // Update each circle only if the element exists
        if(easyLevel) {
            easyLevel.textContent = `${data.easySolved}/${data.totalEasy}`;
            updateCircleProgress('easy', data.easySolved, data.totalEasy);
        }
        if(mediumLevel) {
            mediumLevel.textContent = `${data.mediumSolved}/${data.totalMedium}`;
            updateCircleProgress('medium', data.mediumSolved, data.totalMedium);
        }
        if(hardLevel) {
            hardLevel.textContent = `${data.hardSolved}/${data.totalHard}`;
            updateCircleProgress('hard', data.hardSolved, data.totalHard);
        }
    }

    function updateCircleProgress(difficulty, solved, total) {
        const circle = document.querySelector(`.${difficulty}-progress`);
        if (circle) {
            const percentage = (solved / total) * 100;
            circle.style.background = `conic-gradient(
                var(--progress-color) ${percentage}%, 
                #283a2e 0%
            )`;
        }
    }

    function updateStatsCard(data) {
        if(cardStatsContainer) {
            cardStatsContainer.innerHTML = `
                <div class="stat-item">
                    <span>${data.totalSolved}</span>
                    <span>Total Solved</span>
                </div>
                <div class="stat-item">
                    <span>${data.acceptanceRate.toFixed(1)}%</span>
                    <span>Acceptance Rate</span>
                </div>
                <div class="stat-item">
                    <span>${data.ranking.toLocaleString()}</span>
                    <span>Ranking</span>
                </div>
            `;
        }
    }

    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        if(validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});