import React, { FC } from "react";
import styles from "./ExampleBox.module.css";

const ExampleBox: FC = ({ children }) => {
  return <div className={styles.exampleBox}>{children}</div>;
};

export default ExampleBox;
