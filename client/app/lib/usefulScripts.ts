export function nbrElmSpdDecChar(
    endNbr: number,
    elm: any,
    speed: number,
    decimal: boolean,
    extraCharacter: string
  ) {
    let inc = endNbr / (speed / 10);
    function incNbrRec(i: number, endNbr: number, elm: any) {
      if (i + inc < endNbr) {
        if (decimal) {
          elm.innerHTML =
            extraCharacter +
            (Math.ceil(i * 100) / 100)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          elm.innerHTML =
            extraCharacter +
            Math.round((i * 100) / 100)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        setTimeout(function () {
          incNbrRec(i + inc, endNbr, elm);
        }, 1);
      } else if (i != endNbr && i + inc >= endNbr) {
        elm.innerHTML =
          extraCharacter +
          endNbr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
    incNbrRec(inc, endNbr, elm);
  }

  export function nbrSnbrElmSpdDecChar(
    endNbr: number,
    startNbr: number,
    elm: any,
    speed: number,
    decimal: boolean,
    extraCharacter: string
  ) {

    let inc =( endNbr- startNbr) / (speed / 10);
    if(endNbr > startNbr){
      incNbrRec(startNbr, endNbr, elm);
      }else if (endNbr < startNbr){
        inc =(  startNbr- endNbr) / (speed / 10);
        decNbrRec(startNbr, endNbr, elm);
      }



    function incNbrRec(i: number, endNbr: number, elm: any) {
      if (i + inc < endNbr) {
        if (decimal) {
          elm.innerHTML =
            extraCharacter +
            (Math.ceil(i * 100) / 100)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          elm.innerHTML =
            extraCharacter +
            Math.round((i * 100) / 100)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        setTimeout(function () {
          incNbrRec(i + inc, endNbr, elm);
        }, 1);
      } else if (i != endNbr && i + inc >= endNbr) {
        elm.innerHTML =
          extraCharacter +
          endNbr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  
    function decNbrRec(i: number, endNbr: number, elm: any) {
      if (i - inc > endNbr) {
        if (decimal) {
          elm.innerHTML =
            extraCharacter +
            (Math.ceil(i * 100) / 100)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          elm.innerHTML =
            extraCharacter +
            Math.round((i * 100) / 100)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        setTimeout(function () {
          decNbrRec(i - inc, endNbr, elm);
        }, 1);
      } else if (i != endNbr && i - inc <= endNbr) {
        elm.innerHTML =
          extraCharacter +
          endNbr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }

   
  
  }
  



  




  