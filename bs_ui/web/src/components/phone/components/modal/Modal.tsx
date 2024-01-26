import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ModalParams, ModalProps } from "../../../../types/phone";
import { fetchNui } from "../../../../utils/fetchNui";
import { SendAlert } from "../../../../utils/misc";
import "./Modal.css";

export default function Modal({
  setIsOpen,
  params,
  text,
  callbackEvent,
  style,
  id,
}: ModalProps) {
  const [modalParams, setModalParams] = useState(params);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [noText, setNoText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [state, setState] = useState(modalParams);

  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const { value, name } = e.target;

    const newState = [...state];
    newState[i] = {
      ...newState[i],
      [name]: value,
    };

    setState(newState);
  };

  const handleSubmit = () => {
    let isValid = true;
    let msg = "";

    state.forEach((item) => {
      if (item.expected === "none") {
        isValid = true;
        return;
      }

      if (!item.expected) item.expected = "string";

      if (!item.input) {
        isValid = false;
        msg = "Please fill in all fields.";
      }

      switch (item.expected) {
        case "string":
          if (item.input && item.input.length <= item.minLength) {
            msg = `${item.label} is required.`;
            isValid = false;
          }

          break;
        case "number":
          if (isNaN(Number(item.input))) {
            msg = "The input is not a number.";
            isValid = false;
            return;
          }

          if (
            item.input &&
            item.minLength &&
            item.maxLength &&
            (item.input.length > item.maxLength ||
              item.input.length < item.minLength)
          ) {
            msg = "The input length is not valid.";
            isValid = false;
            return;
          }

          break;
        case "boolean":
          if (item.input !== "true" && item.input !== "false") {
            msg = "The input is not a boolean.";
            isValid = false;
          }

          break;
      }
    });

    setModalParams([]);
    setDisabledButtons(true);
    setNoText(true);

    const time = 2000;

    if (!loading) {
      setError(false);
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        if (isValid) {
          setSuccess(true);
        } else {
          setError(true);
          SendAlert(msg, "error");
        }

        setLoading(false);
        timer.current = window.setTimeout(() => {
          setIsOpen(false);
          if (callbackEvent && isValid) {
            if (id) {
              fetchNui(callbackEvent, { id: id });
            } else {
              fetchNui(callbackEvent, { state: state });
            }
          }
        }, 2000);
      }, time);
    }
  };

  return (
    <div className="modal-wrapper" style={style}>
      <div className="modal-content">
        {modalParams.length > 0 &&
          modalParams.map((param: ModalParams, i: number) => (
            <div className="modal-params" key={param.id}>
              <TextField
                name="input"
                label={param.label}
                onChange={(e) => handleChange(e, i)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {param.icon && (
                        <FontAwesomeIcon
                          icon={param.icon}
                          style={{ color: "white" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>
          ))}

        {text && !noText && <div className="modal-text">{text}</div>}

        {!disabledButtons && (
          <div className="modal-buttons">
            <Button
              style={{
                backgroundColor: "#f1a368",
                color: "black",
              }}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Link to={"/contacts"}>
              <Button
                style={{
                  backgroundColor: "#95ef79",
                  color: "black",
                }}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </Link>
          </div>
        )}

        {disabledButtons && modalParams.length === 0 && noText && (
          <div className="modal-response">
            {success && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{
                  color: "#95ef79",
                  fontSize: "5rem",
                  padding: "4.6rem",
                }}
              />
            )}

            {error && (
              <FontAwesomeIcon
                icon={faXmarkCircle}
                style={{
                  color: "#f44336",
                  fontSize: "5rem",
                  padding: "4.6rem",
                }}
              />
            )}

            {loading && (
              <CircularProgress
                size={68}
                sx={{
                  color: "white",
                  padding: "5rem",
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
