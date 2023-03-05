(function () {
    const numberOfRepos = 4
    let container = document.getElementById('projects-container')
    let ul = document.createElement('ul')
    ul.classList.add('features')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let githubData = JSON.parse(this.responseText)
            let count = 0;
            for (let repo of githubData) {
                if (count >= numberOfRepos) {
                    break;
                }
                if (repo.fork) {
                    continue
                }
                if (repo.name === "calebfletcher.github.io") {
                    continue
                }

                const descriptionString = (repo.description != null) ? `<p>${repo.description}</p>` : ''
                let el = document.createElement("li")
                let a = document.createElement("a")
                a.href = repo.html_url
                a.innerHTML = `<h3>${repo.name}</h3>${descriptionString}`
                el.appendChild(a)
                ul.appendChild(el)

                count++
            }
            container.appendChild(ul)
        }
    };
    xhttp.open('GET', 'https://api.github.com/users/calebfletcher/repos?sort=updated', true);
    xhttp.send();
})()
