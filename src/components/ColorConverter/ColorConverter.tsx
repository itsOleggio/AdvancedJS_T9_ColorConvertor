import { useEffect, useState } from "react"
import hexRgb, { type RgbaObject } from "hex-rgb"

export function ColorConverter(){
    const [colorValue, setColorValue] = useState<string>('#9921ff')
    const [rgbColor, setRgbColor] = useState<RgbaObject>({
      alpha: 1,
      blue: 255,
      green: 33,
      red: 153
    })

    const convertToRgb = (colorHex:string): RgbaObject | null => {
      try{
        const result = hexRgb(colorHex);
        setRgbColor(result)
        return result;
      }catch(error){
        console.log('Невалидный HEX', error)
        return null;
      }
    }

    const checkHexType = (colorHex:string): boolean =>{
      return colorHex.startsWith("#");
    }

    function handleChangeColorValue(value: string):void{
      setColorValue(value);
      if(value.length <= 7){
        convertToRgb(value);
      }
    }

    useEffect(() =>{
      document.body.style.backgroundColor = colorValue;
    }, [colorValue])

    return(
      <label htmlFor="colorInput" className="container">
        <input
          type="text"
          className="input-field"
          id="colorInput"
          placeholder="Введите код цвета..."
          value={colorValue}
          onDoubleClick={setColorValue.bind('#9921ff', '')}
          onChange={(e) => handleChangeColorValue(e.target.value)}
        />

        <span className="result" id="result">
          {
            checkHexType(colorValue) ? 
           "rgb(" + rgbColor.red +","+ rgbColor.green + "," + rgbColor.blue + ")"
           : "Ошибка!"
          }
        </span>
      </label>
    )
}