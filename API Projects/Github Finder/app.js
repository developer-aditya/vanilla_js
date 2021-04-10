// Init Github class
const github = new Github();
// Init UI class
const ui = new UI();


const userInput = document.getElementById('user-input');

userInput.addEventListener('keyup', (e) => {
    const profileName = e.target.value;
    if (profileName !== '') {
        github.getUser(profileName)
            .then(res => {
                ui.updateProfile(res.profile);
                ui.updateRepos(res.repos);
            })
            .catch(err => ui.showError(err));
    }
    else {
        ui.clearProfile();
    }
});