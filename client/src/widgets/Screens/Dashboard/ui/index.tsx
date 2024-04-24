"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";

import styles from "./styles.module.scss";

export const Dashboard = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    async function fetchDataAndLogSites() {
      try {
        const response = await fetch(
          "https://spark-admin-production.up.railway.app/api/website",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiQXJ0ZW0gQW5kcmVldiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEzOTY5NjIyLCJleHAiOjE3MTQwNTYwMjJ9.hiNPY7kRFbohEdZRMvK9TykmdnpcaHn0Ak78_wZ_LbY",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("Полученные сайты:", data);
        setSites(data);
      } catch (error) {
        console.error("Ошибка при получении сайтов:", error);
      }
    }

    fetchDataAndLogSites();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto">
        <Heading text="Ваши Сайты" />
        <Button
          text="Добавить сайт"
          buttonType="regular--small"
          functionType="webPopup"
        />
      </div>
      <section className={styles.sites_section}>
        <ul>
          {sites.map((site, index) => (
            <li key={index}>{site}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
