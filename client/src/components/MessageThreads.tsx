import MessageThread from "./MessageThread"

const messageThreads = [
    {
        id: 1,
        threadPhotoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Elon Musk',
        lastMessage: 'Life is too short for long-term grudges'
    },
    {
        id: 2,
        threadPhotoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Bill Gates',
        lastMessage: 'Life is too short for long-term grudges'
    },
    {
        id: 3,
        threadPhotoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Mark Zuckerberg',
        lastMessage: "Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster."
    },
    {
        id: 4,
        threadPhotoSrc: 'https://www.w3schools.com/howto/img_avatar.png',
        threadTitle: 'Giannis Antetokounmpo',
        lastMessage: 'Life is too short for long-term grudges'
    },
]

function MessageThreads() {
    return (
        <div className="bg-gray-900 text-gray-100">
            <ul>
                {messageThreads.map(mt => (
                    <MessageThread
                        key={mt.id}
                        threadPhotoSrc={mt.threadPhotoSrc}
                        threadTitle={mt.threadTitle}
                        lastMessage={mt.lastMessage}
                    />
                ))}
            </ul>
        </div>
    )
}

export default MessageThreads
