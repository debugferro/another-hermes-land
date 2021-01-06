export default function changeGender(gender) {
  let form = document.querySelector(".changeGender");
  document.getElementById("avatar_gender").value = gender;
  form.submit();
}
