

export Pagination = {
    code: '',
    size: 6,
    page: 1,
    step: 3,

    Init(e) {
        e.innerHTML = '<span></span>';
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Start();
    },
    
    Start() {
        Pagination.Add(1, Pagination.size + 1);
        Pagination.Finish();
    },

    Add(s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },

    Finish() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    Bind() {
        var a = Pagination.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', controller.chooseGroup, false);
        }
    },
};

// var init = function() {
//     Pagination.Init(document.getElementById('pagination'));
// };

// document.addEventListener('DOMContentLoaded', init, false);