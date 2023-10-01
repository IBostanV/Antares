import React, {useEffect, useState} from "react";
import getCategories from "../../../api/category/get-all";
import {VirtualScroller} from 'primereact/virtualscroller';
import Link from 'next/link';

function Quiz() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => await getCategories();
        fetchCategories().then(result => setCategories(result));
    }, []);

    const itemTemplate = (item, options) => (
        <Link
            href="/quiz/categorized/[categoryId]" as={`/quiz/categorized/${item.catId}`}
            className='flex align-items-center p-2 d-flex text-center justify-content-center h3 highlight'
            style={{height: options.props.itemSize + 'px', textDecoration: 'none'}}
        >
            {item.name}
        </Link>
    );

    return (
        <VirtualScroller items={categories}
                         itemSize={50}
                         itemTemplate={itemTemplate}
                         className="border-1 surface-border border-round m-auto my-5 bordered"
                         style={{width: '70%', height: '85vh'}}
        />
    )
}

export default Quiz;