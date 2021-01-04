import $ from 'jquery';

export function getAssetsInfo(avatarInfos, gender) {
   const filter = (names, index, letter) => {
   let filteredNames = names.filter(
     function(word) {
       return word.charAt(index) === letter || word.charAt(index) === 'n';
     });
      return filteredNames;
   }

  // <gender>_:<color>;_<type>_<id>.png
  return (
    {
      bases: filter(avatarInfos.data('bases'), 0, gender),
      baseColors: filter(avatarInfos.data('basecolors'), 0, gender),
      eyes: filter(avatarInfos.data('eyes'), 0, gender),
      eyeColors: filter(avatarInfos.data('eyecolors'), 0, gender),
      hairs: filter(avatarInfos.data('hairs'), 0, gender),
      hairColors: filter(avatarInfos.data('haircolors'), 0, gender),
      mouths: filter(avatarInfos.data('mouths'), 0, gender),
      eyebrows: filter(avatarInfos.data('eyebrows'), 0, gender),
      eyebrowColors: filter(avatarInfos.data('eyebrowcolors'), 0, gender),
      noses: filter(avatarInfos.data('noses'), 0, gender),
      clothes: filter(avatarInfos.data('clothes'), 0, gender),
      acessories: filter(avatarInfos.data('acessories'), 0, gender),
      acessoryColors: filter(avatarInfos.data('acessorycolors'), 0, gender)
    }
  );
}

export function getGender() {
  let avatarInfos = $('.avatar_information');
  return {
    allInfo: avatarInfos,
    info: avatarInfos.data('gender')
  }
}
