import React, { ReactNode, FC, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './TableBodyCell.scss';

interface Store {
  initial: {
    darkTheme: boolean,
  }
}

const TableBodyCell: FC = ({ children }) => {
  const prevPropRef = useRef<ReactNode>();
  const isDark = useSelector((store: Store) => store.initial.darkTheme);

  useEffect(() => {
    prevPropRef.current = children;
  }, [children]);

  const prevProp = prevPropRef.current;

  return (
    <td
      className={cn(
        styles.tableBodyCell,
        {
          [styles.tableBodyCellGreen]: Number(prevProp) < Number(children) && !isDark,
          [styles.tableBodyCellRed]: Number(prevProp) > Number(children) && !isDark,
          [styles.tableBodyCellGreenDarkTheme]: Number(prevProp) < Number(children) && isDark,
          [styles.tableBodyCellRedDarkTheme]: Number(prevProp) > Number(children) && isDark,
        },
      )}
    >
      {children}
    </td>
  );
};

export default TableBodyCell;
