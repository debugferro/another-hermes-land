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
import avatarCreator from '../components/avatars/index';

document.addEventListener("turbolinks:load", function() {
  $(".nav-item").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });

  initSelect2();
  hideDiv();
  initChatRoomCable();
  sendMessage();
  loadScroll();
  // setAvatar();
  if (document.getElementById("avatarCanvas")) {
    avatarCreator();
  }
  if (document.querySelector(".data-bubble")) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
});
