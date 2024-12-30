import React from 'react'
import { Placeholder } from "react-bootstrap";


export const ListEffectSkelton = () => {
  return (
    <>
    {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="avenue_pet">
            <Placeholder as="p" animation="glow">
            <Placeholder xs={8} />
            </Placeholder>
            <Placeholder as="p" animation="wave">
            <Placeholder xs={10} />
            </Placeholder>
            <Placeholder as="p" animation="wave">
            <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="p" animation="wave">
            <Placeholder xs={9} />
            </Placeholder>
        </div>
    ))}
    </>
  )
}


