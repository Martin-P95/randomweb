import React, { useState } from "react";
import { Number, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import axios from "../lib/axios.client";

type Props = {
  numbers: Array<Number>;
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const prisma = new PrismaClient();
  const numbers = await prisma.number.findMany();
  return {
    props: {
      numbers,
    },
  };
};

export default function User({ numbers }: Props) {
  const [list, setList] = useState<Array<Number>>(numbers);
  async function remove(id: number) {
    await axios.post("/api/delete", { id }).then((res) => {
      setList((l) => l.filter((n) => n.id !== id));
    });
  }
  return (
    <section className="backgroundU">
      <p className="nadpisU">Vaše čísla</p>
      <section className="card2">
        {list.map((number, index) => (
          <div key={number.id} className="prvek">
            {index + 1}: {number.number}
            <button onClick={() => remove(number.id)} className="delete">
              <img src="trash-2.svg" alt="" />
            </button>
            
          </div>
        ))}
      </section>
      <Link href="/">
        <a className="odejít">Odejít</a>
      </Link>
    </section>
  );
}