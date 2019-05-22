import _media from 'styled-media-query';

export const media = _media;

enum SizeEnum {
  ExtraSmall = "xs",
  Small = "sm",
  Medium = "md",
  Large = "lg",
  ExtraLarge = "xl",
};

export const size = ({ size: SizeEnum }) => {
  switch (size) {
    case SizeEnum.ExtraSmall:
      
    default:
      return;

  }
};
