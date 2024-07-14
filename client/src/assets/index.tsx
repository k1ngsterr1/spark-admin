interface ImgProps {
  className?: string;
}
export const EmptySvg: React.FC<ImgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 317 314"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_2)">
        <path
          d="M220.122 63.7037C198.147 60.5399 173.123 58.8517 147.062 58.8517C123.212 58.8517 100.233 60.2635 79.6682 62.9255C79.673 62.6406 79.6776 62.3557 79.6916 62.0708C80.2368 45.5327 87.9307 29.8431 101.129 18.3553C114.327 6.86753 131.982 0.492941 150.321 0.594018C168.66 0.695096 186.228 7.26383 199.269 18.8962C212.311 30.5287 219.791 46.3019 220.113 62.8447C220.117 63.1339 220.122 63.4188 220.122 63.7037Z"
          fill="#FF5722"
        />
        <g opacity="0.1">
          <path
            d="M159.105 0.570396C149.352 -0.618195 139.43 0.0554633 129.983 2.54771C120.537 5.03995 111.776 9.29517 104.268 15.0376C96.7612 20.78 90.6752 27.8814 86.4048 35.8817C82.1344 43.8819 79.7749 52.6024 79.4792 61.478C79.4649 61.7629 79.4603 62.0478 79.4557 62.3327C85.5654 61.5419 91.8923 60.8642 98.3876 60.2982C99.1821 45.5119 105.689 31.4431 116.78 20.533C127.871 9.62299 142.846 2.56026 159.105 0.570396Z"
            fill="white"
          />
        </g>
        <path
          d="M250.845 68.7301C240.73 66.2562 230.47 64.2914 220.113 62.8447C203.137 60.4715 186.024 58.9877 168.858 58.4009C161.707 58.1372 154.425 58.0012 147.062 58.0012C141.227 58.0012 135.439 58.0862 129.731 58.2563C112.986 58.7026 96.2816 59.976 79.6917 62.0708C67.411 63.5964 55.2494 65.8206 43.2796 68.7301C15.3708 75.6914 3.05176e-05 85.0214 3.05176e-05 94.9977C3.05176e-05 104.974 15.3708 114.304 43.2796 121.265C62.9068 126.164 87.1061 129.502 113.474 131.033C124.357 131.671 135.608 131.994 147.062 131.994C158.554 131.994 169.843 131.667 180.759 131.029C204.756 129.63 226.957 126.734 245.537 122.524C245.636 122.498 245.731 122.477 245.83 122.456C247.084 122.175 248.318 121.882 249.539 121.588C249.978 121.478 250.411 121.372 250.845 121.265C250.869 121.256 250.895 121.249 250.92 121.244C251.335 121.142 251.745 121.036 252.155 120.933C252.975 120.721 253.786 120.513 254.583 120.296C254.62 120.287 254.653 120.279 254.686 120.27C255.379 120.083 256.058 119.896 256.732 119.709C257.283 119.551 257.83 119.398 258.372 119.241C258.768 119.126 259.16 119.011 259.546 118.897C259.829 118.812 260.107 118.731 260.38 118.646C260.753 118.535 261.125 118.42 261.493 118.305C261.648 118.259 261.804 118.212 261.955 118.161C262.308 118.055 262.652 117.944 262.996 117.833C263.369 117.714 263.741 117.591 264.109 117.472C264.415 117.374 264.722 117.272 265.023 117.17C265.278 117.081 265.528 116.996 265.782 116.911C266.475 116.677 267.154 116.434 267.823 116.196C268.158 116.073 268.492 115.954 268.822 115.831C269.147 115.711 269.477 115.588 269.798 115.465C270.326 115.265 270.844 115.065 271.353 114.865C271.599 114.763 271.848 114.665 272.089 114.572C272.273 114.495 272.452 114.423 272.636 114.346C272.767 114.295 272.9 114.24 273.027 114.185C273.503 113.989 273.974 113.789 274.436 113.589C276.209 112.824 277.863 112.042 279.399 111.242C289.039 106.262 294.125 100.739 294.125 94.9977C294.125 85.0214 278.754 75.6914 250.845 68.7301ZM250.59 120.449C230.94 125.352 206.674 128.69 180.236 130.208C169.485 130.825 158.37 131.144 147.062 131.144C135.792 131.144 124.715 130.829 113.997 130.212C87.5162 128.699 63.2132 125.36 43.5342 120.449C16.0684 113.594 0.942737 104.557 0.942737 94.9977C0.944272 94.153 1.06146 93.3117 1.29165 92.493C3.69537 83.8689 18.4818 75.7978 43.5342 69.5466C55.4134 66.6598 67.4818 64.4484 79.6682 62.9255C96.358 60.8189 113.163 59.5412 130.009 59.0983C135.627 58.9324 141.312 58.8502 147.062 58.8517C154.326 58.8517 161.509 58.9835 168.57 59.2386C185.836 59.8202 203.049 61.3111 220.122 63.7037C230.39 65.1439 240.561 67.0945 250.59 69.5466C275.638 75.7978 290.42 83.8647 292.828 92.4844C293.062 93.3055 293.181 94.1499 293.182 94.9977C293.182 104.557 278.056 113.594 250.59 120.449Z"
          fill="#3F3D56"
        />
        <path
          d="M293.856 95.3846C293.856 101.066 288.666 106.441 279.399 111.242C277.858 112.042 276.199 112.824 274.436 113.589C273.974 113.789 273.503 113.989 273.027 114.185C272.9 114.24 272.767 114.295 272.636 114.346C272.452 114.423 272.273 114.495 272.089 114.572C271.848 114.665 271.599 114.763 271.353 114.865C270.844 115.065 270.326 115.265 269.798 115.465C269.477 115.588 269.147 115.711 268.822 115.831C268.492 115.954 268.158 116.073 267.823 116.196C267.154 116.434 266.475 116.677 265.782 116.911C265.528 116.996 265.278 117.081 265.023 117.17C264.722 117.272 264.415 117.374 264.109 117.472C263.741 117.591 263.369 117.714 262.996 117.833C262.652 117.944 262.308 118.055 261.955 118.161C261.804 118.212 261.648 118.259 261.493 118.305C261.125 118.42 260.753 118.535 260.38 118.646C260.107 118.731 259.829 118.811 259.546 118.897C259.159 119.011 258.768 119.126 258.372 119.241C257.83 119.398 257.283 119.551 256.732 119.709C256.058 119.896 255.379 120.083 254.686 120.27C254.653 120.279 254.62 120.287 254.583 120.296C253.786 120.512 252.975 120.721 252.155 120.933C251.745 121.036 251.335 121.142 250.92 121.244C250.894 121.249 250.869 121.256 250.845 121.265C250.411 121.371 249.977 121.478 249.539 121.588C248.323 121.878 247.083 122.171 245.83 122.456C245.731 122.477 245.636 122.498 245.537 122.524C227.461 126.598 205.284 129.566 180.741 130.999C169.989 131.624 158.78 131.956 147.265 131.956C135.646 131.956 124.343 131.62 113.507 130.982C48.818 127.176 0.674103 112.684 0.674103 95.3846C0.679196 94.332 0.857038 93.2859 1.20184 92.2803C1.23015 92.3526 1.25846 92.4207 1.2916 92.4929C8.01759 108.431 55.7518 121.312 117.688 124.455C127.176 124.939 137.004 125.19 147.062 125.19C157.163 125.19 167.029 124.935 176.555 124.45C238.439 121.295 286.126 108.41 292.828 92.4844C292.941 92.2293 293.04 91.9741 293.125 91.719C293.603 92.8933 293.85 94.1337 293.856 95.3846Z"
          fill="#3F3D56"
        />
        <path
          d="M43.2087 90.8073C35.3641 90.8073 27.0268 89.2847 27.0268 86.4626C27.0268 83.6406 35.3641 82.118 43.2087 82.118C51.0532 82.118 59.3905 83.6406 59.3905 86.4626C59.3905 89.2847 51.0532 90.8073 43.2087 90.8073ZM43.2087 82.9684C34.228 82.9684 27.9695 84.81 27.9695 86.4626C27.9695 88.1152 34.228 89.9568 43.2087 89.9568C52.1893 89.9568 58.4478 88.1152 58.4478 86.4626C58.4478 84.81 52.1893 82.9684 43.2087 82.9684Z"
          fill="#3F3D56"
        />
        <path
          d="M76.6747 110.794C68.8301 110.794 60.4928 109.271 60.4928 106.449C60.4928 103.627 68.8301 102.105 76.6747 102.105C84.5193 102.105 92.8566 103.627 92.8566 106.449C92.8566 109.271 84.5193 110.794 76.6747 110.794ZM76.6747 102.955C67.694 102.955 61.4355 104.797 61.4355 106.449C61.4355 108.102 67.694 109.943 76.6747 109.943C85.6553 109.943 91.9139 108.102 91.9139 106.449C91.9139 104.797 85.6553 102.955 76.6747 102.955Z"
          fill="#3F3D56"
        />
        <path
          d="M250.604 90.8073C242.76 90.8073 234.422 89.2847 234.422 86.4626C234.422 83.6406 242.76 82.118 250.604 82.118C258.449 82.118 266.786 83.6406 266.786 86.4626C266.786 89.2847 258.449 90.8073 250.604 90.8073ZM250.604 82.9684C241.623 82.9684 235.365 84.81 235.365 86.4626C235.365 88.1152 241.623 89.9568 250.604 89.9568C259.585 89.9568 265.843 88.1152 265.843 86.4626C265.843 84.81 259.585 82.9684 250.604 82.9684Z"
          fill="#3F3D56"
        />
        <path
          d="M217.138 110.794C209.293 110.794 200.956 109.271 200.956 106.449C200.956 103.627 209.293 102.105 217.138 102.105C224.983 102.105 233.32 103.627 233.32 106.449C233.32 109.271 224.983 110.794 217.138 110.794ZM217.138 102.955C208.157 102.955 201.899 104.797 201.899 106.449C201.899 108.102 208.157 109.943 217.138 109.943C226.119 109.943 232.377 108.102 232.377 106.449C232.377 104.797 226.119 102.955 217.138 102.955Z"
          fill="#3F3D56"
        />
        <path
          d="M146.906 120.149C139.062 120.149 130.724 118.627 130.724 115.805C130.724 112.983 139.062 111.46 146.906 111.46C154.751 111.46 163.088 112.983 163.088 115.805C163.088 118.627 154.751 120.149 146.906 120.149ZM146.906 112.311C137.926 112.311 131.667 114.152 131.667 115.805C131.667 117.457 137.926 119.299 146.906 119.299C155.887 119.299 162.146 117.457 162.146 115.805C162.146 114.152 155.887 112.311 146.906 112.311Z"
          fill="#3F3D56"
        />
        <path
          d="M158.836 209.526C169.772 209.526 178.638 201.528 178.638 191.661C178.638 181.794 169.772 173.795 158.836 173.795C147.899 173.795 139.033 181.794 139.033 191.661C139.033 201.528 147.899 209.526 158.836 209.526Z"
          fill="#2F2E41"
        />
        <path
          d="M151.305 203.399L141.668 207.753L144.361 212.606L153.999 208.252L151.305 203.399Z"
          fill="#2F2E41"
        />
        <path
          d="M145.632 212.113C146.204 211.331 144.793 209.583 142.481 208.208C140.17 206.833 137.833 206.352 137.261 207.134C136.69 207.916 138.1 209.665 140.412 211.04C142.723 212.415 145.061 212.895 145.632 212.113Z"
          fill="#2F2E41"
        />
        <path
          d="M166.366 203.399L163.672 208.252L173.31 212.606L176.004 207.753L166.366 203.399Z"
          fill="#2F2E41"
        />
        <path
          d="M177.26 211.04C179.571 209.665 180.982 207.916 180.41 207.134C179.839 206.352 177.501 206.833 175.19 208.208C172.878 209.583 171.468 211.331 172.039 212.113C172.611 212.895 174.948 212.415 177.26 211.04Z"
          fill="#2F2E41"
        />
        <path
          d="M157.449 193.397C161.187 193.397 164.217 190.663 164.217 187.291C164.217 183.918 161.187 181.185 157.449 181.185C153.711 181.185 150.681 183.918 150.681 187.291C150.681 190.663 153.711 193.397 157.449 193.397Z"
          fill="white"
        />
        <path
          d="M159.096 186.12C159.973 185.329 159.968 184.041 159.084 183.244C158.201 182.446 156.773 182.442 155.896 183.233C155.019 184.025 155.024 185.313 155.907 186.11C156.791 186.907 158.218 186.912 159.096 186.12Z"
          fill="#3F3D56"
        />
        <path
          d="M174.457 172.225C174.755 165.611 168.437 160.009 160.345 159.712C152.252 159.415 145.451 164.537 145.153 171.151C144.856 177.765 150.481 179.268 158.573 179.564C166.665 179.861 174.159 178.839 174.457 172.225Z"
          fill="#FF5722"
        />
        <path
          d="M185.872 201.016C187.174 200.007 185.343 196.155 181.781 192.411C178.219 188.668 174.276 186.451 172.973 187.46C171.67 188.469 173.502 192.321 177.064 196.065C180.626 199.808 184.569 202.025 185.872 201.016Z"
          fill="#2F2E41"
        />
        <path
          d="M140.663 196.065C144.225 192.321 146.056 188.469 144.754 187.46C143.451 186.451 139.508 188.668 135.946 192.411C132.384 196.155 130.552 200.007 131.855 201.016C133.157 202.025 137.101 199.808 140.663 196.065Z"
          fill="#2F2E41"
        />
        <path
          d="M164.274 198.701C164.489 199.764 164.227 200.859 163.546 201.747C162.865 202.635 161.821 203.242 160.644 203.435C159.466 203.629 158.252 203.392 157.268 202.778C156.284 202.163 155.611 201.222 155.396 200.159L155.395 200.152C154.951 197.939 156.847 197.157 159.299 196.756C161.751 196.356 163.831 196.489 164.274 198.701Z"
          fill="white"
        />
        <path
          d="M125.38 210.665C125.13 210.665 124.89 210.575 124.713 210.416C124.537 210.256 124.437 210.04 124.437 209.814V159.635C124.437 159.41 124.537 159.193 124.713 159.034C124.89 158.874 125.13 158.785 125.38 158.785C125.63 158.785 125.87 158.874 126.047 159.034C126.223 159.193 126.323 159.41 126.323 159.635V209.814C126.323 210.04 126.223 210.256 126.047 210.416C125.87 210.575 125.63 210.665 125.38 210.665Z"
          fill="#CCCCCC"
        />
        <path
          d="M111.239 255.741C110.989 255.741 110.75 255.652 110.573 255.492C110.396 255.333 110.297 255.116 110.297 254.891V218.319C110.297 218.094 110.396 217.877 110.573 217.718C110.75 217.558 110.989 217.469 111.239 217.469C111.489 217.469 111.729 217.558 111.906 217.718C112.083 217.877 112.182 218.094 112.182 218.319V254.891C112.182 255.116 112.083 255.333 111.906 255.492C111.729 255.652 111.489 255.741 111.239 255.741Z"
          fill="#CCCCCC"
        />
        <path
          d="M147.534 225.549C147.284 225.549 147.044 225.459 146.867 225.3C146.69 225.14 146.591 224.924 146.591 224.698V174.519C146.591 174.293 146.69 174.077 146.867 173.918C147.044 173.758 147.284 173.668 147.534 173.668C147.784 173.668 148.023 173.758 148.2 173.918C148.377 174.077 148.476 174.293 148.476 174.519V224.698C148.476 224.924 148.377 225.14 148.2 225.3C148.023 225.459 147.784 225.549 147.534 225.549Z"
          fill="#CCCCCC"
        />
        <path
          d="M133.864 261.695C133.614 261.695 133.375 261.605 133.198 261.445C133.021 261.286 132.922 261.07 132.922 260.844V240.432C132.922 240.207 133.021 239.99 133.198 239.831C133.375 239.671 133.614 239.582 133.864 239.582C134.114 239.582 134.354 239.671 134.531 239.831C134.708 239.99 134.807 240.207 134.807 240.432V260.844C134.807 261.07 134.708 261.286 134.531 261.445C134.354 261.605 134.114 261.695 133.864 261.695Z"
          fill="#CCCCCC"
        />
        <path
          d="M153.19 157.084C152.94 157.084 152.7 156.994 152.523 156.835C152.346 156.675 152.247 156.459 152.247 156.233V135.821C152.247 135.596 152.346 135.38 152.523 135.22C152.7 135.061 152.94 134.971 153.19 134.971C153.44 134.971 153.68 135.061 153.856 135.22C154.033 135.38 154.133 135.596 154.133 135.821V156.233C154.133 156.459 154.033 156.675 153.856 156.835C153.68 156.994 153.44 157.084 153.19 157.084Z"
          fill="#CCCCCC"
        />
        <path
          d="M106.055 166.014C105.805 166.014 105.565 165.924 105.388 165.765C105.211 165.605 105.112 165.389 105.112 165.163V144.752C105.112 144.526 105.211 144.31 105.388 144.15C105.565 143.991 105.805 143.901 106.055 143.901C106.305 143.901 106.544 143.991 106.721 144.15C106.898 144.31 106.997 144.526 106.997 144.752V165.163C106.997 165.389 106.898 165.605 106.721 165.765C106.544 165.924 106.305 166.014 106.055 166.014Z"
          fill="#CCCCCC"
        />
        <path
          d="M188.07 168.14C187.82 168.14 187.58 168.051 187.403 167.891C187.227 167.732 187.127 167.515 187.127 167.29V146.878C187.127 146.652 187.227 146.436 187.403 146.276C187.58 146.117 187.82 146.027 188.07 146.027C188.32 146.027 188.56 146.117 188.737 146.276C188.913 146.436 189.013 146.652 189.013 146.878V167.29C189.013 167.515 188.913 167.732 188.737 167.891C188.56 168.051 188.32 168.14 188.07 168.14Z"
          fill="#CCCCCC"
        />
        <path
          d="M186.185 231.927C185.935 231.927 185.695 231.838 185.518 231.678C185.341 231.519 185.242 231.302 185.242 231.077V206.412C185.242 206.187 185.341 205.971 185.518 205.811C185.695 205.652 185.935 205.562 186.185 205.562C186.435 205.562 186.674 205.652 186.851 205.811C187.028 205.971 187.127 206.187 187.127 206.412V231.077C187.127 231.302 187.028 231.519 186.851 231.678C186.674 231.838 186.435 231.927 186.185 231.927Z"
          fill="#CCCCCC"
        />
        <path
          d="M167.33 253.615C167.08 253.615 166.841 253.525 166.664 253.366C166.487 253.206 166.388 252.99 166.388 252.764V216.193C166.388 215.968 166.487 215.751 166.664 215.592C166.841 215.432 167.08 215.343 167.33 215.343C167.58 215.343 167.82 215.432 167.997 215.592C168.174 215.751 168.273 215.968 168.273 216.193V252.764C168.273 252.99 168.174 253.206 167.997 253.366C167.82 253.525 167.58 253.615 167.33 253.615Z"
          fill="#CCCCCC"
        />
        <path
          d="M171.101 191.104C170.851 191.104 170.611 191.014 170.435 190.854C170.258 190.695 170.159 190.479 170.159 190.253V140.074C170.159 139.848 170.258 139.632 170.435 139.472C170.611 139.313 170.851 139.223 171.101 139.223C171.351 139.223 171.591 139.313 171.768 139.472C171.945 139.632 172.044 139.848 172.044 140.074V190.253C172.044 190.479 171.945 190.695 171.768 190.854C171.591 191.014 171.351 191.104 171.101 191.104Z"
          fill="#CCCCCC"
        />
        <path
          d="M286.674 297.882C288.023 296.863 286.2 292.893 282.601 289.015C279.003 285.138 274.991 282.82 273.642 283.84C272.293 284.859 274.116 288.829 277.715 292.706C281.314 296.584 285.325 298.901 286.674 297.882Z"
          fill="#2F2E41"
        />
        <path
          d="M277.825 293.472C281.37 283.877 275.622 273.505 264.986 270.306C254.35 267.108 242.854 272.294 239.308 281.889C235.763 291.485 241.511 301.857 252.147 305.055C262.783 308.254 274.28 303.068 277.825 293.472Z"
          fill="#2F2E41"
        />
        <path
          d="M267.159 302.054H260.992V312.022H267.159V302.054Z"
          fill="#2F2E41"
        />
        <path
          d="M254.825 302.054H248.658V312.022H254.825V302.054Z"
          fill="#2F2E41"
        />
        <path
          d="M262.02 313.877C264.858 313.877 267.159 313.099 267.159 312.138C267.159 311.178 264.858 310.4 262.02 310.4C259.181 310.4 256.88 311.178 256.88 312.138C256.88 313.099 259.181 313.877 262.02 313.877Z"
          fill="#2F2E41"
        />
        <path
          d="M249.686 313.645C252.524 313.645 254.825 312.867 254.825 311.907C254.825 310.946 252.524 310.168 249.686 310.168C246.847 310.168 244.546 310.946 244.546 311.907C244.546 312.867 246.847 313.645 249.686 313.645Z"
          fill="#2F2E41"
        />
        <path
          d="M252.193 264.659C254.005 258.073 262.006 254.198 270.064 256.003C278.121 257.808 283.184 264.61 281.371 271.196C279.558 277.782 273.545 277.803 265.487 275.998C257.43 274.193 250.38 271.245 252.193 264.659Z"
          fill="#CCCCCC"
        />
        <path
          d="M244.873 283.107C245.627 281.672 242.133 278.753 237.068 276.586C232.003 274.418 227.286 273.824 226.531 275.259C225.777 276.693 229.272 279.613 234.337 281.78C239.402 283.947 244.119 284.541 244.873 283.107Z"
          fill="#2F2E41"
        />
        <path
          d="M255.532 289.922C259.27 289.922 262.3 287.189 262.3 283.816C262.3 280.444 259.27 277.71 255.532 277.71C251.794 277.71 248.764 280.444 248.764 283.816C248.764 287.189 251.794 289.922 255.532 289.922Z"
          fill="white"
        />
        <path
          d="M252.75 283.663C253.996 283.663 255.006 282.752 255.006 281.628C255.006 280.504 253.996 279.592 252.75 279.592C251.504 279.592 250.494 280.504 250.494 281.628C250.494 282.752 251.504 283.663 252.75 283.663Z"
          fill="#3F3D56"
        />
        <path
          d="M255.474 299.116C257.036 299.116 258.302 297.974 258.302 296.565C258.302 295.156 257.036 294.013 255.474 294.013C253.912 294.013 252.645 295.156 252.645 296.565C252.645 297.974 253.912 299.116 255.474 299.116Z"
          fill="white"
        />
        <path
          d="M316.529 314H205.289C205.164 314 205.044 313.955 204.956 313.875C204.868 313.796 204.818 313.688 204.818 313.575C204.818 313.462 204.868 313.354 204.956 313.274C205.044 313.194 205.164 313.149 205.289 313.149H316.529C316.654 313.149 316.774 313.194 316.862 313.274C316.95 313.354 317 313.462 317 313.575C317 313.688 316.95 313.796 316.862 313.875C316.774 313.955 316.654 314 316.529 314Z"
          fill="#3F3D56"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="317" height="314" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
