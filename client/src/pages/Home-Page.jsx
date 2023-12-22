import { useState } from "react";
import CardContent from "../components/Card-Content";
import CarouselWithContent from "../components/Carrousel";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";

export default function HomePage() {
    return (
        <>

            <Navbar />
            <CarouselWithContent />
            <Categories/>
            <CardContent/>
        </>
    )
}