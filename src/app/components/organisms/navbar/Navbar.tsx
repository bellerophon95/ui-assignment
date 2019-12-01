import React, {useCallback, useState} from 'react';
import _map from 'lodash/map';
import _get from 'lodash/get';
import cx from 'classnames';

import './navbar.scss';

interface Item {
    label: string,
    value: string,
}

interface NavBarProps {
    items: Item[],

    onAction(event: any): void,

    itemClassName?: string,
    className?: string,
}

const Navbar = (props: NavBarProps) => {
    const {items, onAction, className, itemClassName} = props;
    const [activeTabState, setActiveTabState] = useState();

    const onItemAction = useCallback(event => {
        const value = _get(event, 'target.dataset.actionid');
        setActiveTabState(value);
        onAction(value);
    }, []);

    return (
        <div className={className}>
            {_map(items, ({label, value}) => {
                    const isActiveTab = (value === activeTabState);
                    return <a key={value} onClick={onItemAction} data-actionid={value}
                              className={cx(itemClassName, {'activeTabState': isActiveTab})}>
                        {label}
                    </a>
                }
            )}
        </div>)
};

export default Navbar;
