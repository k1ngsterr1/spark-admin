import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import styles from "./styles.module.scss";
import { PageSelector } from "../PageSelector";

interface BreadcrumbData {
  label: string;
  icon: IconDefinition;
  path: string;
}

interface BreadcrumbsProps {
  crumbs: BreadcrumbData[];
  margin?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs, margin }) => {
  const pagesData = [
    {
      type: "Main",
      url: "aaa",
    },
  ];

  return (
    <div className={`${styles.breadcrumbs} ${margin}`}>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && <span className="ml-2 mr-2 ">/</span>}
          <span className="flex items-center gap-2 p-2 rounded-md transition hover:bg-gray-100">
            <FontAwesomeIcon
              icon={crumb.icon}
              className="text-xl text-primary"
            />
            {index > 1 ? (
              <PageSelector pages={pagesData} />
            ) : (
              <Link
                href={crumb.path}
                className="transition-all hover:text-primary "
              >
                {crumb.label}
              </Link>
            )}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};
