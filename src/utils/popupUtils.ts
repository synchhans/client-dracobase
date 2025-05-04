export const openPopup = (url: string) => {
  const popupWidth = 600;
  const popupHeight = 700;

  const leftPosition = window.screen.width / 2 - popupWidth / 2;
  const topPosition = window.screen.height / 2 - popupHeight / 2;

  window.open(
    url,
    "_blank",
    `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition}`
  );
};
