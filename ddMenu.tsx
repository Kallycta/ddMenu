import React, {useState, useRef, useEffect} from "react";
import './infoWindowSelectDropDown.scss'



type InfoWindowSelectDropDownType = {
    props?: any
    title?: any
    items?: any
    multiSelect?: any
    
  }

const InfoWindowSelectDropDown: React.FC<InfoWindowSelectDropDownType> = ({title, items, multiSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<any>([]);
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ isOpen ]);



  function hundleOnClick(item?: any) {
    if(!selection.some((current?: any) => current.id === item.id )) {
      if(!multiSelect) {
        setSelection([item])
      }
      else if (multiSelect) {
        setSelection([...selection, item])
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current: any) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    
    }

  }
  function isItemInSelection(item: any) {
      if(selection.find((current: any) => current.id === item.id)) {
        return true;
      }
      return false;
  }
    
    return <>
      <div className="dropdown-wrapper">
        <div tabIndex={0}
              ref={ref}
              className="dropdown-header"
              role="button"
              onKeyDown={() => setIsOpen(!isOpen)}
              onClick={() => setIsOpen(!isOpen) }>
                <div className="dropdown-header__title"> 
                  <p style={isOpen ? {'color': '#bfbfb' }: {'color': '262626'}} className="dropdown-header__title_bold">Выберите источник данных</p>
                </div>
              {/* <div className="dd-header__action">
                  <p>{isOpen ? 'Close' : 'Open'}</p>
              </div> */}
              <div className="dropdown-header__menu">
              {isOpen && (
              <ul className="dd-list">
                {items.map((item: any) =>  (
                <li className="dd-list-item"
                    key={item.id}>
                      <button 
                        type="button"
                        onClick={() => hundleOnClick(item)}
                        >
                          <span>{item.value}</span>
                          <span>{isItemInSelection(item) && 'Selected'}</span>
                          
                        </button>
                </li>
                ))}
              </ul>
            )}
              </div>
            </div>
            
      </div>
    </>
  }

  export default InfoWindowSelectDropDown;


