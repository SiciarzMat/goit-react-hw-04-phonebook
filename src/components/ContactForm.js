import { React, useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';


const StyledForm = styled.form`
border: 1px solid black;
padding: 10px 5px 10px 5px;
width: 300px;
margin-left: 10px;
`
const StyledLabel = styled.label`
display: flex;
flex-direction: column;
`

const StyledInput = styled.input`
margin-top: 5px;        
width: 200px;
`
export const StyledButton = styled.button`
margin-top: 25px;
padding: 3px 5px 3px 5px;
background-color: white;
border: 1px solid rgb(148, 146, 146);
border-radius: 3px;
cursor: pointer;
:hover {
    background-color: rgb(79, 158, 215);
}
:focus {
    background-color: rgb(79, 158, 215);
}
`

export const ContactForm = (props) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = nanoid();
        const newContact = { name, number, id };
        props.handleSubmit(newContact)
        const form = e.currentTarget;
        reset();
        form.reset();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        name === "name" && setName(value)
        name === "number" && setNumber(value)
    }

    const reset = () => {
        setName("");
        setNumber("");
    };


    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>
                Name
                <StyledInput
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                /></StyledLabel>

            <StyledLabel>
                Number
                <StyledInput
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                /></StyledLabel>
            <StyledButton
                type="submit">
                Add contact</StyledButton>
        </StyledForm>
    )
}

ContactForm.propTypes = {
    props: PropTypes.object,
}