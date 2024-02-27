import React from "react";
import { useParams, Link } from "react-router-dom";

import Back from "../../assets/img/back.png";

import "./edit.css";

import Identification from "../../components/identification";
import Weeks from "../../components/weeks";
import References from "../../components/references";

export default function Edit() {
    const { id, idCourse } = useParams();

    return (
        <div className="container-edit">
            <div className="back">
                <Link to={`../pdf/${id}/${idCourse}`}><img src={Back} alt="Voltar" /></Link>
            </div>

            <div className="content-edit">
                <Identification id={id} />

                <Weeks />

                <References id={id} />
            </div>
        </div>
    );
}