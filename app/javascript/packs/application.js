//= require bootstrap-multiselect
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
import $ from "jquery";

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';
import { initSelect2 } from '../components/init_select2';
import { hideDiv } from '../components/hide_div';
import { initChatRoomCable } from '../channels/chat_room_channel';
import { sendMessage } from '../components/send_message';
import { loadScroll } from '../components/load_scroll';
// import { filterDropdown } from '../components/filter_dropdown'

$(".nav-item").on("click", function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});

document.addEventListener("turbolinks:load", function() {
  initSelect2();
  hideDiv();
  initChatRoomCable();
  sendMessage();
  loadScroll();
  // filterDropdown();
});


// document.addEventListener('turbolinks:load', () => {
//   // Call your functions here, e.g:
//   // initSelect2();
// });


      // <%= form_tag users_path, method: :get do %>
      //   <%= text_field_tag :query,
      //     params[:query],
      //     class: "form-control",
      //     placeholder: "Find a user"
      //   %>
      //   <%= hidden_field_tag(:parent_id, "5") %>
      //   <%= submit_tag "Search", class: "btn btn-primary" %>
      // <% end %>
      // <%= f.input :countries, as: :select, collection: User::COUNTRIES, input_html: { class: 'select2 form-large', multiple: true }  %>
      // <%= f.input :languages, as: :select, collection: Language.all, input_html: { class: 'select2 form-large', multiple: true }  %>
