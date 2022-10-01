import CountdownTimer from "../src/components/CountdownTimer";
import differenceInDays from "date-fns/differenceInDays";

const Book = () => {
  const result = differenceInDays(
    new Date(2022, 11, 3, 12, 30, 20, 600),
    new Date()
  );
  const THREE_DAYS_IN_MS = result * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <div>
        <h1 className="text-6xl max-w-xl font-serif mb-2">Book Now</h1>
      </div>
      <div className="py-10">
        <h2 className="text-4xl font-serif flex">
          KYW 2023 Online Application Form
        </h2>
      </div>
      <div className="py-2">
        <p className="font-serif mb-2 flex">
          If you have any questions on how to fill out the form please contact
          us via email (info@knockadoonyouthweek) or phone (085 280 0343).
        </p>
      </div>
      <div className="py-2">
        <p className="font-serif mb-2 flex">
          This year we have made several changes to our application process and
          payment plans. If you haven’t yet we highly recommend you read over
          our news story to familiarise yourself with these changes. You can
          read over these changes here.
        </p>
      </div>
      <div className="py-2">
        <p className="font-serif mb-2 flex">
          Also if this is your first time considering coming to the KYW and you
          still have several questions, check out our “Frequently Asked
          Question’s” section of our website and if you can’t find your answer
          there, feel free to contact us.
        </p>
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-serif flex">Forms will be live in</h2>
      </div>
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />
    </div>
  );
};

export default Book;
