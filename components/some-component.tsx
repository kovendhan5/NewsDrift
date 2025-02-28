import { useRouter } from 'next/navigation';

const SomeComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/categories/technology');
  };

  return (
    <div>
      {/* Use the updated router.push */}
    </div>
  );
};

export default SomeComponent; 