import React, { Dispatch, useState } from 'react'
interface ContactFormProps {
  blurBackground: Dispatch<boolean>
}
import { motion as m } from "framer-motion"

const ContactForm = (props: ContactFormProps) => {
  const [mainText, setmainText] = useState("")
  const [email, setEmail] = useState("")
  const [rows, setRows] = useState(1)
  const [columns, setColumns] = useState(30)
  const [extraElements, setExtraElements] = useState(false)
  const handleClickInside = () => {
    setExtraElements(true)
    setRows(10)
    setColumns(40)
    props.blurBackground(true)
  }
  const handleClickOutside = (): void => {
    setExtraElements(false);
    setRows(1)
    setColumns(30)
    setEmail("")
    props.blurBackground(false)
  };
  const mainDivRef = useOutsideClick(handleClickOutside);

  return (
    <div
      ref={mainDivRef}

      className='absolute z-20 flex justify-center flex-wrap flex-col gap-2 p-2 bg-slate-300 bg-opacity-30  rounded-md align-middle'
      onClick={() => handleClickInside()}>
      <form >
        <m.textarea
          key={"textArea"}
          initial={{ height: `${rows * 2}rem`, width: `${columns}rem` }}
          animate={{ height: `${rows * 2}rem`, width: `${columns}rem` }}
          exit={{
            height: `${rows * 2}rem`,
            width: `${columns}rem`,
            transition: {
              duration: 3,
              ease: "easeOut"
            }
          }}
          transition={{
            duration: 0.7
          }}
          className='h-10 w-80 resize-none rounded-md p-1 focus:outline-none'
          value={mainText}
          placeholder={"Ask me something"}

          onChange={(e) => setmainText(e.target.value)} />
        {extraElements &&
          <m.div
            key={"controls"}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{
              opacity: 0,
              visibility: "hidden",
              transition: {
                duration: 3,
                ease: "easeOut"
              }
            }}
            transition={{
              duration: 1,
              ease: "easeOut"
            }}
            className='flex gap-3 '>
            <input required className='rounded-md  p-1  grow focus:outline-none ' type="email" name="sender" id="senderText" placeholder='Your email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <button type="submit" className='rounded-md p-1   bg-blue-200'>Send</button>
          </m.div>
        }
      </form>
    </div>

  )
}

const useOutsideClick = (callback: () => void) => {
  const ref: any = React.useRef();

  React.useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !(ref.current.contains(event.target))) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return ref;
};
export default ContactForm