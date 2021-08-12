const fetchCV = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    const lang = params.lang ?? 'vn'
    const res = await fetch(`/giang-cv/data/cv.${lang}.json`)
    return await res.json()
}

const render = data => {
    console.log(data)
    document.querySelector('#cvFullName').innerText = data.fullName
    document.querySelector('#cvCareer').innerText = data.career
    document.querySelector('#cvBirthDate').innerText = data.birthDate
    document.querySelector('#cvGender').innerText = data.gender
    document.querySelector('#cvPhone').innerText = data.phone
    document.querySelector('#cvPhone').href = `tel:${data.phone}`
    document.querySelector('#cvMail').innerText = data.mail
    document.querySelector('#cvMail').href = `mailto:${data.mail}`
    document.querySelector('#cvAddress').innerText = data.address
    document.querySelector('#cvGithub').innerText = data.github
    document.querySelector('#cvGithub').href = data.github
    document.querySelector('#cvSkillsTitle').innerText = data.skillsTitle
    document.querySelector('#cvSkills').innerHTML = data.skills.reduce((acc, sk) => {
        return acc += `<div class="skill-item">${sk}</div>`
    }, '')
    document.querySelector('#cvEduTitle').innerText = data.eduTitle
    document.querySelector('#cvEdu').innerHTML = data.edu.reduce((acc, edu) => {
        return acc += `
        <div>
            <div class="d-flex">
                <div><b class="text-uppercase">${edu.school}</b></div>
                <div class="ms-auto"><small><b>${edu.time}</b></small></div>
            </div>
            <div style="font-weight: 300;"><small>${edu.degree} ${edu.spec}</small></div>
        </div>`
    }, '')
    document.querySelector('#cvWorkExpTitle').innerText = data.workExpTitle
    document.querySelector('#cvWorkExp').innerHTML = data.workExp.reduce((acc, exp) => {
        return acc += `
        <div>
            <div class="d-flex">
                <div><b class="text-uppercase">${exp.company}</b></div>
                <div class="ms-auto"><small><b>${exp.time}</b></small></div>
            </div>
            <div style="font-weight: 300;"><small>${exp.career}</small></div>
        </div>`
    }, '')
    document.querySelector('#cvProjectsTitle').innerText = data.projectsTitle
    document.querySelector('#cvProjects').innerHTML = data.projects.reduce((acc, prj) => {
        return acc += `
        <div>
            <div class="d-flex">
                <div><b class="text-uppercase">${prj.name}</b></div>
                <div class="ms-auto"><small><b>${prj.time}</b></small></div>
            </div>
            <div style="font-weight: 300;"><small>${prj.role}</small></div>
            <div class="mt-1" style="font-weight: 300;"><small>
                ${prj.des}<br>Tech: ${prj.tech.join(', ')}<br>Team: ${prj.team}
            </small></div>
        </div>`
    }, '')
    
}

fetchCV().then(render)