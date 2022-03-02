//first search function

const search = async () => {
    // const initialText = document.getElementById('initialText');
    // initialText.classList.add('d-none');
    const showMoreButton = document.getElementById('show-more-btn');
    showMoreButton.classList.add('d-none');
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
    spinner.classList.add('d-block');
    const searchInput = document.getElementById('search-input')
    const searchText = searchInput.value;
    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    if (searchText) {
        const phonesDiv = document.getElementById('phones-Div')
        phonesDiv.innerHTML = ``;
        const res = await fetch(url)
        const phones = await res.json()
        showPhones(phones);
    } else if (searchText == '') {
        alert("Nothing in input field.Please submit a name.")
    }
    spinner.classList.remove('d-block');
    spinner.classList.add('d-none');
}
const showPhones = (obj) => {
    const notFountDiv = document.getElementById('not-found-div')
    if (obj.status) {
        notFountDiv.classList.remove('d-block')
        notFountDiv.classList.add('d-none')
        const phonesDiv = document.getElementById('phones-Div')
        var counter = 0;
        totalPhones = obj.data.length;
        // making the variable global for use in another function
        const showMoreButton = document.getElementById('show-more-btn');
        obj.data.forEach((phone) => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.classList.add('phone');
            const slug = phone.slug;
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h6 class="card-title">${phone.phone_name}</h6>
                <h6 class="card-title">${phone.brand}</h6>
                <div class="card-footer">
                <button class="btn-info text-white w-75 rounded" onclick="phoneDetails('${slug}')">Show Details</button>
                </div>
          </div>`;
            counter++;
            if (counter <= 20) {
                phonesDiv.appendChild(div)

            } else {
                div.classList.add('d-none');
                phonesDiv.appendChild(div);
            }
            //   console.log(counter);

        })
        if (counter > 20) {
            showMoreButton.classList.remove('d-none');
            showMoreButton.classList.add('d-block');
        }

    } else {
        notFountDiv.classList.add('d-block')
        notFountDiv.classList.remove('d-none')
    }

}

//declared global variable
x = 21;
const showMorePhones = () => {
    const phoneArr = document.getElementsByClassName('phone');
    // console.log(totalPhones);

    if (x <= totalPhones) {
        let a = 0;
        for (let i = x; i < totalPhones; i++) {
            phoneArr[i].classList.remove('d-none');
            phoneArr[i].classList.add('d-block');
            a++;
            x++;
            if (a > 20) break;

        }

    }

    if (x + 1 > totalPhones) {
        totalPhones = 0;
        x = 21;
        const showMoreButton = document.getElementById('show-more-btn');
        showMoreButton.classList.remove('d-block')
        showMoreButton.classList.add('d-none');
    }
}

//getting url
const phoneDetails = (slug) => {
    const id = slug;
    url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetails(data))

}

//phone details section
const showPhoneDetails = (p) => {
    const phoneDetailsDiv = document.getElementById('phone-details-div');
    phoneDetailsDiv.innerHTML = ``;
    // console.log(p);
    if (p.status) {
        const div = document.createElement('div');
        const sensor = p.data.mainFeatures.sensors.join(`,\n`);
        // console.log(sensor);
        div.innerHTML = `
        
        <div class="intro-div">
                <img src="${p.data.image}" alt="Not Found">
                <h4>Model : ${p.data.name}</h4>
                <h4>Brand: ${p.data.brand}</h4>
                <h4>Release Date: ${p.data?.releaseDate ? p.data?.releaseDate : 'No Release Date Found'}</h4>
            </div>
            <div class="main-feature-div mb-5">
                <table class="table table-striped table-hover w-100">
                    <th class="text-center" colspan="2">
                        Main Feature 
                    </th>
                    <tr>
                        <td class="w-25">Chip Set</td>
                        <td class="w-75">${p.data.mainFeatures.chipSet}</td>
                    </tr>
                    <tr >
                        <td class="w-25">Display Size</td>
                        <td class="w-75">${p.data.mainFeatures.displaySize}</td>
                    </tr>
                    <tr >
                        <td class="w-25">Memory</td>
                        <td class="w-75">${p.data.mainFeatures.memory}</td>
                    </tr>
                    <tr class='w-100'>
                        <td class="w-25">Sensors</td>
                        <td class="w-75 sensors">${sensor}</td>
                    </tr>
                    <tr >
                        <td class="w-25">Storage</td>
                        <td class="w-75">${p.data.mainFeatures.memory}</td>
                    </tr>
                </table>
            </div>
            <div class="others-div mt-5">
                <table class="table table-striped table-hover w-100">
                    <th class="text-center" colspan="2">
                        Others 
                    </th>
                    <tr >
                        <td class="w-25">Bluetooth</td>
                        <td class="w-75">${p.data.others?.Bluetooth ? p.data.others?.Bluetooth : 'Info Not Available'}</td>
                    </tr>
                    <tr >
                        <td class="w-25">GPS</td>
                        <td class="w-75">${p.data.others?.GPS ? p.data.others?.GPS : 'Info Not Available'}</td>
                    </tr>
                    <tr >
                        <td class="w-25">NFC</td>
                        <td class="w-75">${p.data.others?.NFC ? p.data.others?.NFC : 'Info Not Available'}</td>
                    </tr>
                    <tr >
                        <td class="w-25">Radio</td>
                        <td class="w-75">${p.data.others?.Radio ? p.data.others?.Radio : 'Info Not Available'}</td>
                    </tr>
                    <tr >
                        <td class="w-25">USB</td>
                        <td class="w-75">${p.data.others?.USB ? p.data.others?.USB : 'Info Not Available'}</td>
                    </tr>
                    <tr >
                        <td class="w-25">WLAN</td>
                        <td class="w-75">${p.data.others?.WLAN ? p.data.others?.WLAN : 'Info Not Available'}</td>
                    </tr>
                </table>
            </div>
        
        `;
        phoneDetailsDiv.appendChild(div);
        document.getElementById("phone-details-div").scrollIntoView({ behavior: 'smooth' });
    }
}