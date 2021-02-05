//= require bootstrap-multiselect
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
// External imports
import "bootstrap";
import $ from "jquery";

// Internal imports, e.g:
import { initSelect2 } from '../components/init_select2';
import { hideDiv } from '../components/hide_div';
import { initChatRoomCable } from '../channels/chat_room_channel';
import { sendMessage } from '../components/send_message';
import { loadScroll } from '../components/load_scroll';

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");

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
  if (document.querySelector(".data-bubble")) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }
});
