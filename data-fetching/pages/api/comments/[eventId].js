export default function handler(req, res) {
  const eventId = req.query.eventId;

  console.log(eventId)

  if (req.method === "POST") {
    //add server side valid
    const { email, name, text } = req.body;
    if (!email.includes("@") || !name || !text) {
      res.status(422).json({ message: "Invalid input." });
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(201).json({ message: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Ali", text: "1st comment" },
      { id: "c2", name: "Ali", text: "2nd comment" },
    ];
    res.status(200).json({ comments: dummyList });
  }
}
