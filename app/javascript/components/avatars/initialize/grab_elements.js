export function grabElements() {
  return(
    {
      masterLayer: document.getElementById("avatarCanvas")
    }
  );
}

export async function getAvatar() {
  let avatar = document.querySelector(".avdata");
  const id = avatar.dataset.id;
  const URL = "./api/v1/avatars"
  const response = await fetch(`${URL}/${id}`);
  avatar = await response.json();
  return avatar;
}
