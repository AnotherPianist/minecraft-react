import { useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { dirtImg, glassImg, grassImg, logImg, woodImg } from "../images/images";

const images = {
  dirt: dirtImg,
  glass: glassImg,
  grass: grassImg,
  log: logImg,
  wood: woodImg
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore(state => [state.texture, state.setTexture]);
  const { dirt, glass, grass, log, wood } = useKeyboard();

  useEffect(() => {
    const textures = { dirt, glass, grass, log, wood };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture)
      setTexture(pressedTexture[0]);
  }, [setTexture, dirt, glass, grass, log, wood]);

  useEffect(() => {
    const visibilityTimeOut = setTimeout(() => setVisible(false), 2000);
    setVisible(true);
    return () => clearTimeout(visibilityTimeOut);
  }, [activeTexture]);

  return visible && (
    <div className='absolute centered texture-selector'>
      {Object.entries(images).map(([k, v]) => <img key={k} src={v} alt={k} className={k === activeTexture ? 'active' : ''} />)}
    </div>
  );
};
