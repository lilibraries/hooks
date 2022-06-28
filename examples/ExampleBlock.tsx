import React, { FC, ReactNode } from "react";
import styles from "./ExampleBlock.module.css";

const ExampleBlock: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.exampleBlock}>{children}</div>;
};

export default ExampleBlock;
