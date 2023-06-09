const data = JSON.parse(document.getElementById('js-variables').textContent);
const proxyURL = data.root_url;
let headerHeight;
let rowHeight;
let nControlsPerPagination;
if (window.innerWidth > 610) {
    rowHeight = 46;
    headerHeight = 50;
    nControlsPerPagination = 5;
    document.querySelector('.position-absolute.patient-count').classList.remove('d-none');
} else {
    rowHeight = 67;
    headerHeight = 75.5;
    nControlsPerPagination = 3;
}
const tabContent = document.getElementById('pills-tabContent');
const searchInputHight = 25;
const pad = 15; // padding card-body
const cardBodyHeight = window.innerHeight - 265;
const availableHeight = cardBodyHeight - pad - headerHeight - searchInputHight;
const nPatientPerPage = availableHeight >= rowHeight ? Math.floor(availableHeight / rowHeight) : 1;
const patients = [];
let nPages;

async function getPatients() {
    const response = await fetch(`${proxyURL}/paciente/lista`);
    const data = await response.json();
    data.forEach(patient => {
        patients.push(patient);
    })
    addPatients(patients);

    // nPages = Math.ceil(data.length / nPatientPerPage);
    // if (data.length > nPatientPerPage) {
    //     createPagination(data, nPages);
    //     addPaginationControls();
    // } else {
    //     populateTableBody(data);
    // }
}

function addPatients(patients) {
    nPages = Math.ceil(patients.length / nPatientPerPage);
    if (patients.length > nPatientPerPage) {
        createPagination(patients, nPages);
        addPaginationControls();
    } else {
        populateTableBody(patients);
    }
}

function populateTableBody(patients) {
    const templateElements = document.getElementById('template-elements').content.cloneNode(true);
    const tableHead = templateElements.getElementById('head-template');
    const table = templateElements.querySelector('table');
    const tableBody = document.createElement('tbody');

    patients.forEach(patient => {
        var row = document.createElement('tr');
        var cedula = document.createElement('td');
        cedula.textContent = patient.cedula;
        row.appendChild(cedula);
        var nombre = document.createElement('td');
        nombre.textContent = patient.nombre;
        row.appendChild(nombre);
        var apellidos = document.createElement('td');
        apellidos.textContent = patient.apellidos;
        row.appendChild(apellidos);
        var telefono = document.createElement('td');
        telefono.textContent = patient.telefono;
        row.appendChild(telefono);
        var updated_at = document.createElement('td');
        updated_at.textContent = patient.updated_at;
        row.appendChild(updated_at);
        var view = document.createElement('td');
        view.innerHTML = `<a href="/paciente/actualizar/${patient.cedula}">Ver</a>`;
        row.appendChild(view);
        tableBody.appendChild(row);
    })

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    tabContent.appendChild(table);
    
}

function createPagination(patients, nPages) {
    // Iterate over the pages
    for (let page = 1; page <= nPages; page++) {
        const templateElements = document.getElementById('template-elements').content.cloneNode(true);
        const tableHead = templateElements.getElementById('head-template').cloneNode(true);

        const tabPane = document.createElement('div');
        // const table = document.querySelector('table').cloneNode(true);
        const table = templateElements.querySelector('table').cloneNode();
        const tableBody = document.createElement('tbody');

        // Determine the start and end index of objects for the current page
        const startIndex = (page - 1) * nPatientPerPage;
        const endIndex = startIndex + nPatientPerPage;
        
        // Slice the data to get objects for the current page
        const pagePatients = patients.slice(startIndex, endIndex);
        
        // Create a table row for each object on the current page
        pagePatients.forEach(patient => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
            <td>${patient.cedula}</td>
            <td>${patient.nombre}</td>
            <td>${patient.apellidos}</td>
            <td>${patient.telefono}</td>
            <td>${patient.updated_at}</td>
            <th><a href="/paciente/actualizar/${patient.cedula}">Ver</a></th>
            `;
            
            tableBody.appendChild(row);
        });
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tabPane.appendChild(table);
        tabPane.id = `pills-${page}`;
        tabPane.setAttribute('aria-labelledby', `pills-${page}-tab`);
        tabPane.setAttribute('role', 'tabpanel');
        tabPane.setAttribute('tabindex', '0'); 
        tabPane.classList.add('tab-pane', 'fade'); // <div class="tab-pane fade show active d-none" id="pills-1" role="tabpanel" aria-labelledby="pills-1-tab" tabindex="0">
        if (page == 1) {
            tabPane.classList.add('show', 'active');
        }
        tabContent.appendChild(tabPane);
    }
}


// --------------------------- Pagination for paginating buttons --------------------------

let currentLowestControlIndex = 1;

const unorderedList = document.querySelector('.nav.nav-pills');

function hideAndDisplayButtons() {
    const paginationControls = unorderedList.querySelectorAll('.page-item.control-button');
    paginationControls.forEach((control, index) => {
        if ((index + 1 >= currentLowestControlIndex) && (index + 1 < currentLowestControlIndex + nControlsPerPagination)) {
            control.classList.remove('d-none');
        } else {
            control.classList.add('d-none');
        }
    })
}

function goToNextPage() {
    if (currentLowestControlIndex + nControlsPerPagination * 2 <= nPages) {
        currentLowestControlIndex += nControlsPerPagination;
    } else {
        currentLowestControlIndex = nPages - nControlsPerPagination + 1;
    }
    hideAndDisplayButtons();
}

function goToPreviousPage() {
    if (currentLowestControlIndex - nControlsPerPagination > 0) {
        currentLowestControlIndex -= nControlsPerPagination;
    } else {
        currentLowestControlIndex = 1;
    }
    hideAndDisplayButtons();
}

function appendPaginationControls() {
    let paginationControl;
    let paginationLink;
    for (let i = 1; i <= nPages; i++) {
        const templateElements = document.getElementById('template-elements').content.cloneNode(true);
        paginationControl = templateElements.querySelector('.page-item.control-button').cloneNode(true);
        paginationLink = paginationControl.querySelector('.page-link');
        paginationLink.setAttribute('id', `pills-${i}-tab`);
        paginationLink.setAttribute('data-bs-target', `#pills-${i}`);
        paginationLink.setAttribute('aria-controls', `pills-${i}`);
        paginationLink.textContent = i;
        if (i == 1) {
            paginationLink.classList.add('active');
            paginationLink.setAttribute('aria-selected', 'true');
        } else {
            paginationLink.setAttribute('aria-selected', 'false');
        }
        unorderedList.appendChild(paginationControl);
    }
}

function addPaginationControls() {
    if (nPages > nControlsPerPagination) {
        const templateElements = document.getElementById('template-elements').content.cloneNode(true);
        const previousControl = templateElements.querySelector('.arrow-paginator.previous');
        const nextControl = templateElements.querySelector('.arrow-paginator.next');
        previousControl.addEventListener('click', goToPreviousPage);
        nextControl.addEventListener('click', goToNextPage);
        unorderedList.appendChild(previousControl);
        appendPaginationControls();
        unorderedList.appendChild(nextControl);
        hideAndDisplayButtons();
    } else {
        appendPaginationControls();
    }
}


// ------------------------------------- Search bar ---------------------------------------

function filterAndAddPatients() {
    const filter = searchInput.value.toLowerCase();
    const matchingPatients = patients.filter(patient => {
        return String(patient.cedula).includes(filter) ||
        String(patient.nombre).toLowerCase().includes(filter) ||
        String(patient.apellidos).toLowerCase().includes(filter) ||
        String(patient.telefono).toLowerCase().includes(filter) ||
        String(patient.updated_at).toLowerCase().includes(filter)
    })
    unorderedList.setHTML('');
    tabContent.setHTML('');
    addPatients(matchingPatients);
}

const searchInput = document.getElementById('patient-search-input');
searchInput.addEventListener('input', filterAndAddPatients)


window.addEventListener('load', getPatients);