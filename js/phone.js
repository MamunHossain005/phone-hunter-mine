const loadPhones = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const json = await res.json();
    const data = json.data;
    displayPhones(data, isShowAll);
};

const displayPhones = (data, isShowAll) => {
    const phoneList = document.getElementById('phone-list');
    phoneList.innerHTML = '';
    const showAllButton = document.getElementById('show-all-btn');
    
    if(data.length > 6 && !isShowAll) {
        data = data.slice(0, 6);
        showAllButton.classList.remove('hidden');
    }
    else {
        showAllButton.classList.add('hidden');
    }

    data.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="p-10 bg-slate-100 rounded-lg mb-4">
                <img src="${phone.image}" alt="" class="mx-auto">
            </div>
            <h4 class="text-2xl font-bold text-gray-700">${phone.phone_name}</h4>
            <p class="px-4 mt-4 text-gray-500">There are many variations of passages of available, but the majority have suffered</p>
            <h4 class="text-2xl font-bold text-gray-700 mt-3">&dollar;999</h4>
            <button class="phone-btn-primary mt-4" onclick="phoneDetails('${phone.slug}')">Show Details</button>
        `;
        const divProperties = ['shadow-lg', 'p-5', 'rounded-lg', 'text-center']
        div.classList.add(...divProperties);
        phoneList.appendChild(div);
    });
    showSpinner(false);
};

const searchPhones = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    showSpinner(true);
    loadPhones(searchText, isShowAll);
}

//loading spinner
const showSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loader');
    if(isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//Show all
const showAll = () => {
    searchPhones(true);
}

//load phone details 
const loadSinglePhoneDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const json = await res.json();
    const data = json.data;
    displayPhoneDetails(data);
}

const displayPhoneDetails = (data) => {
    const phoneBody = document.getElementById('phone-body');
    phoneBody.innerHTML = `
        <div class="bg-sky-100 py-10 rounded-lg">
            <img src ="${data.image}" alt="" class="mx-auto">
        </div>
        <h3 class="text-xl font-bold my-4">${data.name}</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
        <h5 class="text-lg font-bold mt-4">Storage: <span class="text-base font-normal">${data.mainFeatures.storage}</span></h5>
        <h5 class="text-lg font-bold">Display Size: <span class="text-base font-normal">${data.mainFeatures.displaySize}</span></h5>
        <h5 class="text-lg font-bold">Memory: <span class="text-base font-normal">${data.mainFeatures.memory}</span></h5>
        <h5 class="text-lg font-bold">Slug: <span class="text-base font-normal">${data.slug}</span></h5>
        <h5 class="text-lg font-bold">Brand: <span class="text-base font-normal">${data.brand}</span></h5>
        <h5 class="text-lg font-bold">GPS: <span class="text-base font-normal">${data.others?.GPS || 'No GPS'}</span></h5>
    `;
    show_Details_modal.showModal();
}

const phoneDetails = (id) => { 
    loadSinglePhoneDetails(id);
}




