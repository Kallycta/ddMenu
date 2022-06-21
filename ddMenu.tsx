import React, { useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getDataSource } from "../../../redux/ds/ds.selector";
import { RootState } from "../../../redux/redux.store";
import "./select.scss";
import useAction from "../../../hooks/useAction";
import useClosableRef from "../../../hooks/useCloseRef";
import { ISelect } from "../../templates";

type ISelectType = {
    props?: any;
    cmp: ISelect;
};

const SelectMenu: React.FC<ISelectType> = ({ cmp }) => {
    const dataSource = useTypedSelector((state: RootState) =>
        getDataSource(state, cmp.ds.key)
    );
    const action = useAction(cmp.actions);

    const [isOpen, setIsOpen] = useState(false);
    const [selectItem, setSelectItem] = useState("Выберите источник данных");
    // const [selection, setSelection] = useState<any>([]);

    const { ref } = useClosableRef<HTMLDivElement>(isOpen, setIsOpen);

    const classShow =
        "constructor-select__header-menu constructor-select__header-menu--show";
    const classHide =
        "constructor-select__header-menu constructor-select__header-menu--hide";

    return (
        <>
            <div className="constructor-select">
                <div
                    tabIndex={0}
                    ref={ref}
                    className="constructor-select__header"
                    role="button"
                    onKeyDown={() => setIsOpen(!isOpen)}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="constructor-select__header-title">
                        <span>{selectItem}</span>
                    </div>
                    <div className={isOpen ? classShow : classHide}>
                        <ul className="constructor-select__list ">
                            {cmp.isClear && (
                                <li
                                    className="constructor-select__list-item"
                                    key="010101"
                                    data-id="clear"
                                    onClick={(e) => {
                                        action.onClick(
                                            e.currentTarget.dataset.id
                                        );

                                        setSelectItem(cmp?.textClear?.key);
                                    }}
                                >
                                    <button type="button">
                                        <span>{cmp?.textClear?.key}</span>
                                    </button>
                                </li>
                            )}

                            {dataSource ? (
                                dataSource?.items.map((item: any) => (
                                    <li
                                        className="constructor-select__list-item"
                                        key={item.id}
                                        data-id={item.id}
                                        onClick={(e) => {
                                            action.onClick(
                                                e.currentTarget.dataset.id
                                            );
                                            setSelectItem(item[cmp.item.val]);
                                        }}
                                    >
                                        <button type="button">
                                            <span>{item[cmp.item.val]}</span>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="constructor-select__list-item not_data">
                                    <div
                                        onClick={() =>
                                            setSelectItem("Нет данных")
                                        }
                                        className="constructor-select__list-item-btn"
                                    >
                                        <span>Нет данных</span>
                                        {/* <img src="./data-error.png" alt="data-error" /> */}
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectMenu;
