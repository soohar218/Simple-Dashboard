import { useForm } from "@mantine/form";
import { ENDPOINT, Message } from "./App";
import { KeyedMutator } from "swr";

function AddTransfer({ mutate }: { mutate: KeyedMutator<Message[]> }) {

  const form = useForm({
    initialValues: {
      seq: "",
      sender_rtn: "",
      sender_an: "",
      receiver_rtn: "",
      receiver_an: "",
      amount: "",
    },
  });

  async function createTransfer(values: { seq: number; sender_rnt: number; sender_an: number; receiver_rtn: number; receiver_an: number; amount: number; }) {
    const updated = await fetch(`${ENDPOINT}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate();
    form.reset();
  }

  return (
    <>
      <form onSubmit={form.onSubmit(createTransfer)}>
          <h4>Add a new Transfer</h4>
          <label>Seq: </label><input required type="number" name="seq" {...form.getInputProps("seq")} /><br />
          <label>Sender_rtn: </label><input required type="number" name="sender_rtn" {...form.getInputProps("sender_rtn")} /><br />
          <label>Sender_an: </label><input required type="number" name="sender_an" {...form.getInputProps("sender_an")} /><br />
          <label>Receiver_rtn: </label><input required type="number" name="receiver_rtn" {...form.getInputProps("receiver_rtn")} /><br />
          <label>Receiver_an: </label><input required type="number" name="receiver_an" {...form.getInputProps("receiver_an")} /><br />
          <label>Amount (cents): </label><input required type="number" name="amount" {...form.getInputProps("amount")} /><br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddTransfer;