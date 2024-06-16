import React, { useEffect, useRef} from 'react';
import moment from 'moment';

type History = {
    name: string,
    content: string,
    data: number,
}

export interface IProps { 
    history?:History[],
    myName:string
}

export default function ChattingRecord({ history, myName }: IProps) {    
    const divRef = useRef<HTMLDivElement>(null);

    const formateDate = (data: number) => { 
      const _data = moment(data)
        return _data.fromNow();
    }

    const contentComp = history ? history.map((h, i) => {
        const style = myName === h.name ? "mine" : "";
        return <div className={`item ${style}`} key={i}>
            <div className='name'>{h.name}</div>
            <div className='content'>{h.content}</div>
            <div className='date'>{formateDate(h.data)}</div>
        </div>
    }) : null;

    useEffect(() => { 
        if (divRef.current === null) { return };
        const div = divRef.current;
        div.scroll(0, div.scrollHeight);
    },[divRef,history])

  return (
      <div className="contentArea" ref={divRef}>
          {contentComp}
    </div>
  )
}
