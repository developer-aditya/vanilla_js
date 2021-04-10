class Github {
    constructor() {
        this.clientId = '57dd50b7bc69f2d937fb';
        this.clientSecret = 'ec507fa7a0f33104df50a488d169f11d118639cc';
        this.count = 5;
        this.order = 'created: asc';
    }

    async getUser(profileName) {
        const profileResponse = await fetch(`https://api.github.com/users/${profileName}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);

        const reposResponse = await fetch(`https://api.github.com/users/${profileName}/repos?per_page=${this.count}&sort=${this.order}&client_id=${this.clientId}&client_secret=${this.clientSecret}`);

        if (profileResponse.ok === true) {
            const profileData = await profileResponse.json();
            const repos = await reposResponse.json();
            return {
                // if profileData was just profile then instead of { profile:profile, } a single { profile, } would work like repos
                profile: profileData,
                repos
            };
        }
        else {
            await Promise.reject(new Error(`Something Went Wrong : ${profileResponse.status}`));
        }
    }
}