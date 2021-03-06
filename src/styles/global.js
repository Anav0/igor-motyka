import { createGlobalStyle } from "styled-components"
import fonts from "src/styles/fonts.css"

export default createGlobalStyle`
  *,html{
    margin: 0;
    box-sizing: border-box;
    font-size:12px;
    color: white;
    font-family: 'Tomorrow', sans-serif;
  }
  .firstSection{
    margin-top: 100vh;
    @media (min-width: ${(props) => props.theme.sm}) {
      margin-top: 120vh;
    }

  }


  .acrylic {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .carousel{
    width:100%;
    height:100%;
    cursor: grab;
    outline: none;
    &:before,&:after{
      outline: none;
    }
  }
  .appear{
    opacity: 1;
    transition: opacity 1.5s ease-in-out;
  }
  .icon:hover{
    transform: scale(1.15);
  }
  .list-item-margin{
      margin: 4rem 0;
      @media (min-width: ${(props) => props.theme.sm}) {
        margin: 10rem 0;
      }
  }
  .icon{
    cursor: pointer;
    transition: transform 0.15s ease-in-out;
  }

  body{
    height:120vh;
    margin: 0;
    font-size:12px;
  }

  ul,ol{
    padding:0;
    margin:0;
  }

  h1{
    font-weight: 700;
    font-size: 3rem;
    font-weight: normal;
  }

  h2{
    font-weight: 600;
    font-size: 2.5rem;
  }

  h3{
    font-weight: 500;
    font-size: 2rem;
  }

  h4{
    font-weight: 500;
    font-size: 1.5rem;
  }

  h5{
    font-weight: 400;
    font-size: 1.25rem;
  }

  h6{
    font-weight: 400;
    font-size: 1rem;
  }
`
