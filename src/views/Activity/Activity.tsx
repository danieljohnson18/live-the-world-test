import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  openLoader,
  closeLoader,
} from "../../redux/actions/loader/loaderActions";

import { Carousel } from "@trendyol-js/react-carousel";

import { Notify } from "../../components/toast/Toast";
import Modal from "react-modal";
import client from "../../api/baseUrl";
import styles from "./styles.module.scss";

import BackArrow from "../../assets/images/webinar-back.svg";
import FrontArrow from "../../assets/images/webinar-front.svg";

const Activity = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [activity, setActivity] = React.useState<any>();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const fetchActivity = async () => {
    dispatch(openLoader());
    try {
      const { data }: any = await client.get(
        `frontend/activities/slug/castle-of-gerald-the-devil`
      );
      setActivity(data);
      console.log("data", data);
      Notify("success", "success");
      dispatch(closeLoader());
    } catch (error: any) {
      dispatch(closeLoader());
      // Notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        {!!activity && (
          <Carousel
            show={3}
            slide={1}
            swiping={true}
            responsive={true}
            useArrowKeys={true}
            rightArrow={
              <div>
                <img src={FrontArrow} alt="front-arrow" />
              </div>
            }
            leftArrow={
              <div>
                <img src={BackArrow} alt="back-arrow" />
              </div>
            }
          >
            {activity?.images?.map((image: any) => (
              <div style={{}}>
                <img
                  src={image.url}
                  alt={image.name}
                  style={{
                    borderRadius: "10px",
                    width: "420px",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>
        )}

        <div className={styles.activityBody}>
          <h2 className={styles.activityHeader}>{activity?.name}</h2>
          <div className={styles.labelContainer}>
            {activity?.labels?.map((label: any) => (
              <div className={styles.label}>{label.name}</div>
            ))}
          </div>
          <div>{activity?.description_short}</div>
          <div>{activity?.description_long}</div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>Hello</div>
          </Modal>

          <iframe
            name="gMap"
            title="gMap"
            src={`https://maps.google.com/maps?q=${
              !!activity && activity?.latitude
            },${!!activity && activity?.longitude}&hl=es;z=14&amp;output=embed`}
          ></iframe>
          <br />
          <small>
            <a
              href={`https://maps.google.com/maps?q=${
                !!activity && activity?.latitude
              },${
                !!activity && activity?.longitude
              }&hl=es;z=14&amp;output=embed`}
              style={{ color: "#0000FF", textAlign: "left" }}
              target="_blank"
              rel="noreferrer"
            >
              See map bigger
            </a>
          </small>
          <div>
            <h2 className={styles.nearby}>Nearby Activities</h2>
            <div className={styles.activityCard}>
              <div className={styles.imageSection}>
                <img
                  src={activity?.images[0].url}
                  className={styles.firstImage}
                  alt={activity?.images[0].sourceText}
                />
                <div className={styles.saveButton}>Save</div>
              </div>
              <h3 className={styles.imageTitle}>{activity?.images[0].name}</h3>
              <h4 className={styles.imageDescription}>
                {activity?.images[0].alternativeText}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
