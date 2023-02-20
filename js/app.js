document.addEventListener('DOMContentLoaded', function () {
    // Text
    const card_number = document.querySelector('.number');
    const card_name = document.querySelector('.name');
    const card_month = document.querySelector('.month');
    const card_year = document.querySelector('.year');
    const card_cv = document.querySelector('.cv');
    // inputs
    const input_name = document.querySelector('#name');
    input_name.maxLength = 24;
    const input_number = document.querySelector('#number');
    input_number.maxLength = 16;
    const input_month = document.querySelector('#month');
    input_month.maxLength = 2;
    const input_year = document.querySelector('#year');
    input_year.maxLength = 2;
    const input_cv = document.querySelector('#cv');
    input_cv.maxLength = 3;
    //form
    const form = document.querySelector('#form');
    //div
    const div = document.querySelector('.div-form');


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.remove('flex');
        form.classList.add('hidden');
        addDiv();
    });


    // Create DIV Message
    function addDiv() {
        const div_thnk = document.createElement('DIV');
        div_thnk.classList.add('lg:w-[28rem]', 'm-auto', 'flex', 'flex-col', 'gap-5', 'w-80', 'pt-32', 'pb-5', 'justify-center', 'items-center');
        div.prepend(div_thnk);

        const img = document.createElement('IMG');
        img.src = 'images/icon-complete.svg';
        img.alt = 'complete';
        div_thnk.appendChild(img);

        const header1 = document.createElement('H1');
        header1.textContent = 'Thank you!';
        header1.classList.add('uppercase', 'text-3xl', 'tracking-widest');
        div_thnk.appendChild(header1);

        const paragraph = document.createElement('P');
        paragraph.textContent = "We've added your card details";
        paragraph.classList.add('text-[#8e8593]', 'pb-6');
        div_thnk.appendChild(paragraph);

        const btn = document.createElement('BUTTON');
        btn.textContent = 'Continue';
        btn.classList.add('bg-[#21092f]', 'w-full', 'text-white', 'p-5', 'rounded-lg', 'text-lg', 'hover:bg-[#2a0c3b]', 'active:translate-y-2', 'bg-msg');
        div_thnk.appendChild(btn);

        //Remove DIV message
        const btn_msg = document.querySelector('.bg-msg');
        btn_msg.addEventListener('click', () => {
            div_thnk.remove();
            form.classList.remove('hidden');
            form.classList.add('flex');

            form[0].value = '';
            removeAlert(form[0].parentElement);
            form[0].classList.remove('border-red-600');
            card_name.innerHTML = 'Jane Appleseed';

            form[1].value = '';
            removeAlert(form[1].parentElement);
            form[1].classList.remove('border-red-600');
            card_number.innerHTML = '0000 0000 0000 0000';            

            form[2].value = '';
            removeAlert(form[2].parentElement);
            form[2].classList.remove('border-red-600');
            card_month.innerHTML = '00';

            form[3].value = '';
            removeAlert(form[3].parentElement);
            form[3].classList.remove('border-red-600');
            card_year.innerHTML = '00';

            form[4].value = '';
            removeAlert(form[4].parentElement);
            form[4].classList.remove('border-red-600');
            card_cv.innerHTML = '000';
            
        });
    }

    //Card Number bg
    input_number.addEventListener('keyup', (e) => {
        const size = 4;
        let total = '';
        for (let i = 0; i < e.target.value.toString().length; i += size) {
            result = e.target.value.toString().slice(i, i + size);
            total += result.concat(' ');
            if (e.target.value.length > 16) {
                return
            }
        }
        card_number.innerHTML = total;
        //Text in bg
        if (e.target.value.length === 0) {
            card_number.innerHTML = '0000 0000 0000 0000';
        }
    });

    input_name.addEventListener('keyup', (e) => {
        if (e.target.value.length > 24) {
            return
        }
        card_name.innerHTML = e.target.value;
        //Text in bg
        if (e.target.value.length === 0 || e.target.value.match(/[0-9]/g)) {
            card_name.innerHTML = 'Jane Appleseed';
        }
    });
    input_month.addEventListener('keyup', (e) => {
        if (e.target.value.length > 2) {
            return
        }
        card_month.innerHTML = e.target.value;
        //Text in bg
        if (e.target.value.length === 0 || e.target.value.match(/[a-zA-Z\s]/g) || e.target.value > 12) {
            card_month.innerHTML = '00';
        }
    });
    input_year.addEventListener('keyup', (e) => {
        if (e.target.value.length > 2) {
            return
        }
        card_year.innerHTML = e.target.value;
        //Text in bg
        if (e.target.value.length === 0 || e.target.value.match(/[a-zA-Z\s]/g)) {
            card_year.innerHTML = '00';
        }
    });
    input_cv.addEventListener('keyup', (e) => {
        if (e.target.value.length > 3) {
            return
        }
        card_cv.innerHTML = e.target.value;
        //Text in bg
        if (e.target.value.length === 0 || e.target.value.match(/[a-zA-Z\s]/g)) {
            card_cv.innerHTML = '000';
        }
    });

    // Events
    input_number.addEventListener('blur', validation);
    input_name.addEventListener('blur', validation);
    input_month.addEventListener('blur', validation);
    input_year.addEventListener('blur', validation);
    input_cv.addEventListener('blur', validation);

    //Validation
    function validation(e) {
        if (e.target.value.trim() === '') {
            error("Can't be blank", e.target.parentElement);
            e.target.classList.add('border-red-600');
            return;
        }
        if (e.target.id === 'number' && !numbers(e.target.value)) {
            error('Wrong format, numbers only', e.target.parentElement);
            e.target.classList.add('border-red-600');
            return;
        }
        if (e.target.id === 'name' && !letters(e.target.value)) {
            error('Wrong format, letters only', e.target.parentElement);
            e.target.classList.add('border-red-600');
            return;
        }
        if (e.target.id === 'month' && !numbers(e.target.value) || e.target.id === 'month' && e.target.value > 12) {
            error('Wrong format, numbers only', e.target.parentElement);
            e.target.classList.add('border-red-600');
            return;
        }
        if (e.target.id === 'year' && !numbers(e.target.value)) {
            error('Wrong format, numbers only', e.target.parentElement);
            e.target.classList.add('border-red-600');
            return;
        }
        if (e.target.id === 'cv' && !numbers(e.target.value) || e.target.id === 'cv' && e.target.value.length > 3) {
            error('Wrong format, numbers only', e.target.parentElement);
            e.target.classList.add('border-red-600');
            return;
        }

        removeAlert(e.target.parentElement);
        e.target.classList.remove('border-red-600');
    }

    // Alert message
    function error(message, reference) {
        removeAlert(reference);

        const msg = document.createElement('P');
        msg.textContent = message;
        msg.classList.add('text-red-600', 'normal-case', 'first-letter:uppercase', '-mt-3', 'text-xs', 'alert');
        reference.appendChild(msg);
    }

    //Remove alert
    function removeAlert(reference) {
        const alert = reference.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }

    //Only numbers
    function numbers(card_numbers) {
        const regex = /^[0-9]*$/;
        const result = regex.test(card_numbers);
        return result;
    }

    //Only letters
    function letters(card_letters) {
        const regex = /^[a-zA-Z\s]*$/;
        const result = regex.test(card_letters);
        return result;
    }
});

