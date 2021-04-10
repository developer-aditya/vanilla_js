class UI {

    updateProfile(profile) {
        // Removing Error Message Once Profile Is fetched Sucessfully
        const errMessage = document.getElementById("errorDiv");
        if (errMessage !== null) {
            errMessage.remove();
        }


        // Creating Profile Div 
        const profileDiv = document.getElementById("profile");
        let name = ` <h3 class="display-5 mb-3"> ${profile.name} </h3>`;
        if (profile.name === null) {
            name = ``;
        }

        const html = `<div class="container">
                        ${name}
                        <div class="card card-body mb-5 shadow">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="profile-img shadow-1">
                                        <img src="${profile.avatar_url}" alt="profile-img" class="img-fluid rounded">
                                    </div>
                                    <a href="${profile.html_url}" target="_blank" class="btn btn-primary btn-block p-3 my-3 rounded shadow-1"> View Profile</a>
                                </div>
                                <div class="col-md-9">
                                    <div class="text-center mb-4">
                                        <span class="badge badge-danger p-3 mt-2 shadow-1">Public Repos: ${profile.public_repos}</span>
                                        <span class="badge badge-warning p-3 mt-2 shadow-1">Public Gists: ${profile.public_gists}</span>
                                        <span class="badge badge-success p-3 mt-2 shadow-1">Followers: ${profile.followers}</span>
                                        <span class="badge badge-info p-3 mt-2 shadow-1">Following: ${profile.following}</span>
                                    </div>
                                    <ul class="list-group">
                                        
                                        <li class="list-group-item">Company: ${profile.company}</li>
                                        <li class="list-group-item">Website/Blog: ${profile.blog}</li>
                                        <li class="list-group-item">Location: ${profile.location}</li>
                                        <li class="list-group-item">Member Since: ${profile.created_at}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>                        
                    </div>`;
        profileDiv.innerHTML = html;
    }


    updateRepos(repos) {
        console.log(repos);
        const profileDiv = document.getElementById("profile");
        let repoList = "";

        repos.forEach(repo => {
            repoList += `<div class="card card-body mb-2">
                            <div class="row">
                                <div class="col-md-6">
                                    <a href=${repo.html_url} target="_blank">${repo.name}</a>
                                </div>
                                <div class="col-md-6">
                                    <span class="badge badge-primary p-2 rounded">Stars: ${repo.stargazers_count}</span>
                                    <span class="badge badge-info p-2 rounded">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-success p-2 rounded">Forks: ${repo.forks_count}</span>
                                </div>
                            </div>
                        </div>`;
        });

        profileDiv.innerHTML += `<div class="container">
                                    <h3 class="display-5 mb-3"> Repositories </h3>
                                    ${repoList}
                                </div>`;
    }




    showError(error) {
        const errMessage = document.getElementById("errorDiv");
        if (errMessage !== null) {
            errMessage.remove();
        }

        const searchBox = document.getElementById("searchContainer");
        const errorDiv = document.createElement('div');
        errorDiv.id = "errorDiv";
        errorDiv.className = "container";
        errorDiv.innerHTML = `<div class="list-group-item list-group-item-danger text-center mb-3">${error}</div>`;
        document.getElementsByTagName('body')[0].insertBefore(errorDiv, searchBox);

        setTimeout(() => {
            if (errorDiv !== null) {
                errorDiv.remove();
            }
        }, 2500);
    }




    clearProfile() {

        const errMessage = document.getElementById("errorDiv");
        if (errMessage !== null) {
            errMessage.remove();
        }

        document.getElementById("profile").innerHTML = "";
    }
}