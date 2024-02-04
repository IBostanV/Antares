import styled from 'styled-components';

export const NavbarItem = styled.div`
    margin-left: 15px;
    margin-right: 15px;

    @font-face {
        font-family: 'Montserrat-Medium';
        src: url('/fonts/Montserrat/Montserrat-Medium.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'TimeBurner';
        src: url('/fonts/TimeBurner/Timeburner-xJB8.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    button {
        background-color: transparent;
        border: none;
        color: #FFFFFF !important;
        font-family: 'Montserrat-Medium', sans-serif;
        font-size: 1em;
        text-decoration: none;

        &:hover {
            color: gray;
        }
    }
`;