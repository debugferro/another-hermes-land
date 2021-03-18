import $ from 'jquery';
import 'select2';


const initSelect2 = () => {
  $(document).ready(function() {
    $('.select2').select2({
      tags: true,
      tokenSeparators: [',', ';']
    });
  })
  $(document).ready(function () {
    $('.select2max').select2({
      tags: true,
      tokenSeparators: [',', ';']
    }).on("change", function (e) {
      if ($(this).val().length > 3) {
        $(this).val($(this).val().slice(0, 3));
      }
    });
  }
)};

export { initSelect2 };
