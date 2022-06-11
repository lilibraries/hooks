import React, { FC } from "react";
import styles from "./ExampleBlock.module.css";

const ExampleBlock: FC = ({ children }) => {
  return <div className={styles.exampleBlock}>{children}</div>;
};

export default ExampleBlock;
