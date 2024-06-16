import React from 'react'

interface IProps {
    users: string[]
}

export default function MemberList({ users }: IProps) {
    const userList = users.map((u, index) => {
        const _styles = index % 2 === 0 ? 'blackBg' : "redBg";
        const combStyle = _styles + " userColumn"
        return <div className={combStyle} key={index}>{u}</div>
    })
    return (
        <div className="listContainer">
            <div className='listTitle'>MemberList</div>
            {userList}
        </div>
    )
}
