import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className={`${styles.section} mt-10`}>
            {/* <EventCard active={true} data={allEvents && allEvents[0]} />
            <EventCard active={true} data={allEvents && allEvents[1]} /> */}
            {allEvents && allEvents.length !== 0 && (
              <>
                {allEvents &&
                  allEvents.map((i, index) => (
                    <EventCard data={i} key={index} />
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
